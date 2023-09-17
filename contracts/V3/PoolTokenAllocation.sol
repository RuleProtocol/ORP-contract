//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./interface/IERCMintBurnClaimRole.sol";
import "./struct/Constant.sol";
import "./util/Arrays.sol";
import "./PoolTokenStruct.sol";
import "hardhat/console.sol";

contract PoolTokenAllocation is Initializable {
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;
    using Arrays for uint256[];

    address pool;
    EnumerableSet.AddressSet _tokens;
    mapping(address => TokenInfo) public tokens;
    mapping(address => mapping(uint => EnumerableSet.UintSet)) tokenAllocationIds;
    mapping(uint => AmountAllocation) amountAllocations;
    mapping(uint => IdAllocation) idAllocations;
    mapping(address => mapping(uint => uint)) tokenAmountAllocated;

    function initialize(address _pool) public initializer {
        pool = _pool;
    }

    ///
    /// ============ check ============
    ///
    modifier onlyPool() {
        require(msg.sender == pool, "onlyPool!");
        _;
    }

    function getToken(AllocationParams memory params) private returns (TokenInfo memory tokenInfo) {
        require(_tokens.contains(params.token), "error token");
        require(params.allocationId > 0, "allocationId must >0");
        require(params.allocationType <= AllocationTypeTransfer, "error allocation type");
        require(params.optType <= OperationTypeEditBurned, "error operation type");
        if (params.allocationType == AllocationTypeTransfer) {
            require(params.optType != OperationTypeIncreaseSupply
                && params.optType != OperationTypeBurn, "error operation type");
        }
        return tokens[params.token];
    }

    ///
    /// ============ manage ============
    ///
    function addTokens(TokenInfo memory tokenInfo, bool add) public onlyPool {
        require(tokenInfo.erc <= TOKEN_ERC_ERC1155, "error erc type");
        // TODO other check
        if (add) {
            _tokens.add(tokenInfo.token);
            tokens[tokenInfo.token] = tokenInfo;
        } else {
            _tokens.remove(tokenInfo.token);
            delete tokens[tokenInfo.token];
        }
    }

    function allTokens() public view returns (TokenInfo[] memory tokenInfos) {
        tokenInfos = new TokenInfo[](_tokens.length());
        for (uint i = 0; i < _tokens.length(); i++) {
            tokenInfos[i] = tokens[_tokens.at(i)];
        }
        return tokenInfos;
    }

    function allocate(AllocationParams memory params) public onlyPool {
        require(params.amount > 0, "amount must great than 0");
        TokenInfo memory tokenInfo = getToken(params);
        require(tokenInfo.erc != TOKEN_ERC_ERC721, "error token");
        // TODO other check
        address token = params.token;
        uint tokenId = params.tokenId;
        uint16 allocationId = params.allocationId;
        uint8 allocationType = params.allocationType;
        uint8 optType = params.optType;
        uint amount = params.amount;
        if (tokenInfo.erc != TOKEN_ERC_ERC1155) {
            tokenId = 0;
        }
        tokenAllocationIds[token][tokenId].add(allocationId);
        AmountAllocation storage allocation = amountAllocations[allocationKey(token, tokenId, allocationId, allocationType)];
        updateDesc(allocation, params);

        // TODO emit EVENT?
        if (optType == OperationTypeEditInitial) {
            if (allocationType == AllocationTypeTransfer) {
                allocation.balance = amount;
            } else {
                require(amount + allocation.increasedSupply > allocation.burned + allocation.released, "error allocation, amount+increasedSupply must > burned+released");
            unchecked {
                allocation.balance -= (allocation.initialSupply - amount);
            }
                allocation.initialSupply = amount;
            }
        } else if (optType == OperationTypeIncreaseSupply) {
            allocation.increasedSupply += amount;
            allocation.balance += amount;
        } else if (optType == OperationTypeBurn) {
            require(amount < allocation.balance, "error allocation, amount must < balance");
            allocation.burned += amount;
            allocation.balance -= amount;
        } else if (optType == OperationTypeEditReleased) {
            allocation.released = amount;
        } else if (optType == OperationTypeEditBurned) {
            allocation.burned = amount;
        } else {
            revert("error operation type");
        }
    }

    function idAllocate(AllocationParams memory params) public onlyPool {
        require(params.ids.length > 0, "empty ids");
        for (uint i = 0; i < params.ids.length; i++) {
            require(params.ids[i].id > 0, "id must great than 0");
        }

        TokenInfo memory tokenInfo = getToken(params);
        require(tokenInfo.erc == TOKEN_ERC_ERC721, "error token");
        // TODO other check
        address token = params.token;
        uint tokenId = params.tokenId;
        uint16 allocationId = params.allocationId;
        uint8 allocationType = params.allocationType;
        uint8 optType = params.optType;
        IdAmount[] memory ids = params.ids;
        tokenAllocationIds[token][0].add(allocationId);

        IdAllocation storage allocation = idAllocations[allocationKey(token, 0, allocationId, allocationType)];
        updateDesc(allocation, params);

        // TODO emit EVENT?
        if (optType == OperationTypeEditInitial) {
            if (allocationType == AllocationTypeTransfer) {
                delete allocation.ids;
                addLittleIds(allocation.ids, ids);
            } else {
                if (allocation.initialIds.length > 0) {
                    for (uint i = allocation.initialIds.length - 1; i > 0; i--) {
                        IdAmount memory _idAmount = allocation.initialIds[i];
                        allocation.ids.remove(_idAmount.id);
                        if (_idAmount.amount > 0) {
                            delete allocation.idAmount[_idAmount.id];
                        }
                    }
                    delete allocation.initialIds;
                }
                addMuchIds(allocation, allocation.initialIds, ids);
                delete allocation.sortedIds;
                allocation.sortedIds = allocation.ids.values().sort();
            }
        } else if (optType == OperationTypeIncreaseSupply) {
            addMuchIds(allocation, allocation.increasedIds, ids);
            delete allocation.sortedIds;
            allocation.sortedIds = allocation.ids.values().sort();
        } else if (optType == OperationTypeBurn) {
            addLittleIds(allocation.burnedIds, ids);
        } else if (optType == OperationTypeEditReleased) {
            delete allocation.releasedIds;
            addLittleIds(allocation.releasedIds, ids);
        } else if (optType == OperationTypeEditBurned) {
            delete allocation.burnedIds;
            addLittleIds(allocation.burnedIds, ids);
        } else {
            revert("error operation type");
        }
    }

    function addLittleIds(EnumerableSet.UintSet storage ids, IdAmount[] memory newIds) private {
        for (uint i = 0; i < newIds.length; i++) {
            IdAmount memory idAmount = newIds[i];
            for (uint i = 0; i <= idAmount.amount; i++) {
                uint tokenId = idAmount.id + i;
                ids.add(tokenId);
            }
        }
    }

    function addMuchIds(IdAllocation storage allocation, IdAmount[] storage ids, IdAmount[] memory newIds) private {
        for (uint i = 0; i < newIds.length; i++) {
            IdAmount memory _idAmount = newIds[i];
            ids.push(_idAmount);
            allocation.ids.add(_idAmount.id);
            if (_idAmount.amount > 0) {
                allocation.idAmount[_idAmount.id] = _idAmount.amount;
            }
        }
    }

    function recordInput(address token, uint16 allocationId, uint tokenId, uint amount) public onlyPool {
        require(_tokens.contains(token), "error token");
        TokenInfo memory tokenInfo = tokens[token];
        // TODO other check
        if (TOKEN_ERC_ERC721 == tokenInfo.erc) {
            tokenAllocationIds[token][0].add(allocationId);
            IdAllocation storage allocation = idAllocations[allocationKey(token, 0, allocationId, AllocationTypeTransfer)];
            allocation.ids.add(tokenId);
        } else {
            tokenAllocationIds[token][tokenId].add(allocationId);
            AmountAllocation storage allocation = amountAllocations[allocationKey(token, tokenId, allocationId, AllocationTypeTransfer)];
            allocation.balance += amount;
        }
    }

    function spendAllocation(address token, uint8 erc, uint8 allocationType, bool burn, uint16 allocationId, uint tokenId, uint amount) public onlyPool {
        console.log("token %s, allocationType %s, allocationId %s", token, allocationType, allocationId);
        console.log("tokenId %s, amount %s", tokenId, amount);
        // TODO extract different methods
        if (erc == TOKEN_ERC_ERC721) {
            IdAllocation storage allocation = idAllocations[allocationKey(token, 0, allocationId, allocationType)];
            // TODO temp
            if (allocationId > 0) {
                if (allocationType == AllocationTypeTransfer) {
                    require(allocation.ids.contains(tokenId), "tokenId not available");
                    allocation.ids.remove(tokenId);
                } else {
                    require(idAvailable(allocation, tokenId), "tokenId not available");
                }
            }
            // TODO other check

            if (burn) {// burn
                allocation.burnedIds.add(tokenId);
            } else {// release
                allocation.releasedIds.add(tokenId);
            }
        } else {
            if (erc != TOKEN_ERC_ERC1155) {
                tokenId = 0;
            }
            AmountAllocation storage allocation = amountAllocations[allocationKey(token, tokenId, allocationId, allocationType)];
            console.log("allocation.balance %s, amount %s", allocation.balance, amount);

            // TODO temp
            if (allocationId > 0) {
                require(amount <= allocation.balance, "amount exceed allowed");
                allocation.balance -= amount;
            }
            // TODO other check

            if (burn) {// burn
                allocation.burned += amount;
            } else {// release
                allocation.released += amount;
            }
        }
    }

    function updateDesc(AmountAllocation storage allocation, AllocationParams memory params) private {
        if (allocation.id != params.allocationId) {
            allocation.id = params.allocationId;
        }
        if (allocation.typ != params.allocationType) {
            allocation.typ = params.allocationType;
        }
        if (params.optType == OperationTypeEditInitial) {
            if (!isEqual(allocation.name, params.name)) {
                allocation.name = params.name;
            }
            if (!isEqual(allocation.description, params.description)) {
                allocation.description = params.description;
            }
        }
    }

    function updateDesc(IdAllocation storage allocation, AllocationParams memory params) private {
        if (allocation.id != params.allocationId) {
            allocation.id = params.allocationId;
        }
        if (allocation.typ != params.allocationType) {
            allocation.typ = params.allocationType;
        }
        if (params.optType == OperationTypeEditInitial) {
            if (!isEqual(allocation.name, params.name)) {
                allocation.name = params.name;
            }
            if (!isEqual(allocation.description, params.description)) {
                allocation.description = params.description;
            }
        }
    }

    function idAvailable(IdAllocation storage allocation, uint tokenId) private view returns (bool){
        console.log("allocation.sortedIds.length %s", allocation.sortedIds.length);

        if (allocation.sortedIds.length == 0) {
            return false;
        }
        if (allocation.releasedIds.contains(tokenId)) {
            return false;
        }
        if (allocation.burnedIds.contains(tokenId)) {
            return false;
        }

        uint index = allocation.sortedIds.findUpperBound(allocation.sortedIds.length, tokenId);
        console.log("allocation.sortedIds.length %s, index %s, tokenId %s", allocation.sortedIds.length, index, tokenId);
        if (index < allocation.sortedIds.length && allocation.sortedIds[index] == tokenId) {
            return true;
        } else if (index > 0) {
            uint lowerId = allocation.sortedIds[index - 1];
            uint amount = allocation.idAmount[lowerId];
            console.log("allocation.sortedIds.length %s, lowerId %s, amount %s", allocation.sortedIds.length, lowerId, amount);
            if (tokenId <= lowerId + amount) {
                return true;
            }
        }
        return false;
    }

    function getAllocation(address token, uint tokenId, uint8 allocationType) public view returns (AmountAllocation[] memory) {
        require(_tokens.contains(token), "error token");
        TokenInfo memory tokenInfo = tokens[token];
        require(tokenInfo.erc != TOKEN_ERC_ERC721, "error token");
        if (tokenInfo.erc != TOKEN_ERC_ERC1155) {
            tokenId = 0;
        }
        EnumerableSet.UintSet storage ids = tokenAllocationIds[token][tokenId];
        uint total = ids.length();
        if (!ids.contains(0)) {
            total += 1;
        }
        AmountAllocation[] memory allocations = new AmountAllocation[](total);
        for (uint i = 0; i < ids.length(); i++) {
            allocations[i] = amountAllocations[allocationKey(token, tokenId, uint16(ids.at(i)), allocationType)];
        }
        if (!ids.contains(0)) {
            allocations[total - 1] = amountAllocations[allocationKey(token, tokenId, 0, allocationType)];
        }
        return allocations;
    }

    function getIdAllocation(address token, uint8 allocationType) public view returns (IdAllocationView[] memory) {
        require(_tokens.contains(token), "error token");
        TokenInfo memory tokenInfo = tokens[token];
        require(tokenInfo.erc == TOKEN_ERC_ERC721, "error token");
        EnumerableSet.UintSet storage ids = tokenAllocationIds[token][0];
        uint total = ids.length();
        if (!ids.contains(0)) {
            total += 1;
        }
        IdAllocationView[] memory allocations = new IdAllocationView[](total);
        for (uint i = 0; i < ids.length(); i++) {
            IdAllocation storage allocation = idAllocations[allocationKey(token, 0, uint16(ids.at(i)), allocationType)];
            copyAllocation(allocations[i], allocation);
        }
        if (!ids.contains(0)) {
            IdAllocation storage allocation = idAllocations[allocationKey(token, 0, 0, allocationType)];
            copyAllocation(allocations[total - 1], allocation);
        }
        return allocations;
    }

    function copyAllocation(IdAllocationView memory _allocation, IdAllocation storage allocation) internal view {
        _allocation.id = allocation.id;
        _allocation.typ = allocation.typ;
        _allocation.name = allocation.name;
        _allocation.description = allocation.description;
        _allocation.ids = allocation.ids.values();
        _allocation.initialIds = allocation.initialIds;
        _allocation.increasedIds = allocation.increasedIds;
        _allocation.burnedIds = allocation.burnedIds.values();
        _allocation.releasedIds = allocation.releasedIds.values();
    }

    function allocationKey(address token, uint tokenId, uint allocationId, uint8 allocationType) public pure returns (uint){
        return uint(keccak256(
                abi.encodePacked(
                    token,
                    tokenId,
                    allocationId,
                    allocationType
                )
            )) - 1;
    }

    function isEqual(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
