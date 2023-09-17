//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";

import "./interface/IERCMintBurnClaimRole.sol";
import "./struct/Constant.sol";
import "./PoolTokenStruct.sol";
import "./PoolTokenAllocation.sol";

contract PoolToken is AccessControlEnumerable, Pausable, Multicall, Initializable {
    string private _name;
    string private _symbol;

    PoolTokenAllocation public poolTokenAllocation;

    function initialize(bytes32[] memory roles, address _allocation, string memory name_, string memory symbol_) public initializer {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        if (roles.length > 0) {
            for (uint i; i < roles.length; i++) {
                _grantRole(roles[i], _msgSender());
            }
        }
        poolTokenAllocation = PoolTokenAllocation(_allocation);
        poolTokenAllocation.initialize(address(this));

        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function version() public pure returns (uint){return 1;}

    function cname() public pure returns (string memory){return "PoolToken";}

    event Receive(address indexed from, uint256 value);
    receive() external payable {emit Receive(msg.sender, msg.value);}

    ///
    /// ============ check ============
    ///
    modifier onlyRoleForToken(bytes32 role, address token) {
        if (!hasRole(role, msg.sender)) {
            _checkRole(keccak256(abi.encode(role, token)));
        }
        _;
    }

    modifier checkTokenRole(AllocationParams memory params) {
        if (params.allocationType == AllocationTypeMint) {
            require(IERCMintBurnClaimRole(params.token).hasRole(MINTER_ROLE, address(this)), "miss MINTER_ROLE");
        }
        _;
    }

    ///
    /// ============ manage ============
    function addTokens(TokenInfo memory tokenInfo, bool add) public onlyRole(ADD_TOKEN_ROLE) {
        poolTokenAllocation.addTokens(tokenInfo, add);
        if (add) {
            bytes32 tokenAdminRole = keccak256(abi.encode(tokenInfo.token));
            _grantRole(tokenAdminRole, msg.sender);

            _setRoleAdmin(keccak256(abi.encode(TRANSFER_ROLE, tokenInfo.token)), tokenAdminRole);
            _setRoleAdmin(keccak256(abi.encode(MINTER_ROLE, tokenInfo.token)), tokenAdminRole);
            _setRoleAdmin(keccak256(abi.encode(BURN_ROLE, tokenInfo.token)), tokenAdminRole);
        }
    }

    function allTokens() public view returns (TokenInfo[] memory tokenInfos) {
        return poolTokenAllocation.allTokens();
    }

    function getAllocation(address token, uint tokenId, uint8 allocationType) public view returns (AmountAllocation[] memory) {
        return poolTokenAllocation.getAllocation(token, tokenId, allocationType);
    }

    function getIdAllocation(address token, uint8 allocationType) public view returns (IdAllocationView[] memory) {
        return poolTokenAllocation.getIdAllocation(token, allocationType);
    }

    event AddCap(address indexed token, uint erc, uint16 allocationId, uint256 id, uint256 amount);
    event BurnFailed(address indexed token, uint erc, uint16 allocationId, uint256 id, uint256 amount);
    event AddCapFailed(address indexed token, uint erc, uint16 allocationId, uint256 id, uint256 amount);

    function allocate(AllocationParams memory params) public onlyRole(ALLOCATE_ROLE) checkTokenRole(params) {
        poolTokenAllocation.allocate(params);

        address token = params.token;
        uint tokenId = params.tokenId;
        uint16 allocationId = params.allocationId;
        uint8 optType = params.optType;
        uint amount = params.amount;
        // FIXME native coin?
        (uint8 erc, address __, string memory logo) = poolTokenAllocation.tokens(token);
        if (erc != TOKEN_ERC_ERC1155) {
            tokenId = 0;
        }
        if (optType == OperationTypeBurn) {
            try this.tryBurn(token, erc, tokenId, amount) {
                emit Burn(token, erc, allocationId, address(0), tokenId, amount);
            }catch{
                emit BurnFailed(token, erc, allocationId, tokenId, amount);
            }
        } else if (optType == OperationTypeIncreaseSupply) {
            try this.tryAddCap(token, erc, tokenId, amount) {
                emit AddCap(token, erc, allocationId, tokenId, amount);
            }catch{
                emit AddCapFailed(token, erc, allocationId, tokenId, amount);
            }
        }
    }

    function idAllocate(AllocationParams memory params) public onlyRole(ALLOCATE_ROLE) checkTokenRole(params) {
        poolTokenAllocation.idAllocate(params);

        address token = params.token;
        uint tokenId = params.tokenId;
        uint16 allocationId = params.allocationId;
        uint8 optType = params.optType;
        IdAmount[] memory ids = params.ids;
        uint cap;
        if (optType == OperationTypeIncreaseSupply || optType == OperationTypeBurn) {
            for (uint i = 0; i < ids.length; i++) {
                IdAmount memory idAmount = ids[i];
                if (optType == OperationTypeIncreaseSupply) {
                    uint maxId = idAmount.id + idAmount.amount;
                    if (maxId > cap) {
                        cap = maxId;
                    }
                }
                for (uint i = 0; i <= idAmount.amount; i++) {
                    uint tokenId = idAmount.id + i;
                    // mint to dead-address
                    if (optType == OperationTypeBurn) {
                        try this.tryBurn(token, TOKEN_ERC_ERC721, tokenId, 0) {
                            emit Burn(token, TOKEN_ERC_ERC721, allocationId, address(0), tokenId, 0);
                        }catch{
                            emit BurnFailed(token, TOKEN_ERC_ERC721, allocationId, tokenId, 0);
                        }
                    }
                }
            }
        }

        if (optType == OperationTypeIncreaseSupply && cap > 0) {
            try this.tryAddCap(token, TOKEN_ERC_ERC721, 0, cap) {
                emit AddCap(token, TOKEN_ERC_ERC721, allocationId, 0, cap);
            }catch{
                emit AddCapFailed(token, TOKEN_ERC_ERC721, allocationId, 0, cap);
            }
        }
    }

    function tryBurn(address token, uint8 erc, uint tokenId, uint amount) public {
        if (erc == TOKEN_ERC_ERC20) {
            IERCMintBurnClaimRole(token).mint(DEAD_ADDRESS, amount);
        } else if (erc == TOKEN_ERC_ERC1155) {
            IERCMintBurnClaimRole(token).mint(DEAD_ADDRESS, tokenId, amount, new bytes(0));
        } else if (erc == TOKEN_ERC_ERC721) {
            IERCMintBurnClaimRole(token).claim(tokenId, DEAD_ADDRESS);
        }
    }

    function tryAddCap(address token, uint8 erc, uint tokenId, uint cap) public {
        if (cap == 0) {
            return;
        }
        if (erc == TOKEN_ERC_ERC20 || erc == TOKEN_ERC_ERC721) {
            uint currentCap = IERCMintBurnClaimRole(token).cap();
            if (currentCap == 0) {
                return;
            }
            if (erc == TOKEN_ERC_ERC721) {
                if (cap <= currentCap) {// maxTokenId
                    return;
                } else {
                    cap -= currentCap;
                }
            }
            IERCMintBurnClaimRole(token).addCap(cap);
        } else if (erc == TOKEN_ERC_ERC1155) {
            uint currentCap = IERCMintBurnClaimRole(token).cap(tokenId);
            if (currentCap == 0) {
                return;
            }
            IERCMintBurnClaimRole(token).addCap(tokenId, cap);
        }
    }

    function recordInput(address token, uint16 allocationId, uint tokenId, uint amount) public onlyRole(CLUSTER_ROLE) {
        poolTokenAllocation.recordInput(token, allocationId, tokenId, amount);
    }

    function _spendAllocation(address token, uint8 erc, uint8 allocationType, bool burn, uint16 allocationId, uint tokenId, uint amount) private {
        poolTokenAllocation.spendAllocation(token, erc, allocationType, burn, allocationId, tokenId, amount);
    }

    function _spendAllocation(address token, uint8 erc, uint8 allocationType, uint16 allocationId, uint id, uint amount) private {
        _spendAllocation(token, erc, allocationType, false, allocationId, id, amount);
    }

    /// control
    function pause(bool _paused) public onlyRole(PAUSER_ROLE) {
        if (_paused) {
            _pause();
        } else {
            _unpause();
        }
    }

    ///
    /// ============ approve ============
    ///
    event Approval(address indexed token, uint erc, address indexed owner, address indexed spender, uint256 tokenId, uint256 amount);
    event ApproveForAll(address indexed token, uint erc, address indexed owner, address indexed spender, bool approved);

    function ERC20Approve(address token, address spender, uint256 amount) external onlyRoleForToken(APPROVE_ROLE, token) whenNotPaused() {
        IERC20(token).approve(spender, amount);
        emit Approval(token, TOKEN_ERC_ERC20, address(this), spender, 0, amount);
    }

    function ERC721Approve(address token, address spender, uint256 tokenId) external onlyRoleForToken(APPROVE_ROLE, token) whenNotPaused() {
        IERC721(token).approve(spender, tokenId);
        emit Approval(token, TOKEN_ERC_ERC721, address(this), spender, tokenId, 0);
    }

    function ERC721ApproveForAll(address token, address spender, bool approved) external onlyRoleForToken(APPROVE_ROLE, token) whenNotPaused() {
        IERC721(token).setApprovalForAll(spender, approved);
        emit ApproveForAll(token, TOKEN_ERC_ERC721, address(this), spender, approved);
    }

    function ERC1155ApproveForAll(address token, address spender, bool approved) external onlyRoleForToken(APPROVE_ROLE, token) whenNotPaused() {
        IERC1155(token).setApprovalForAll(spender, approved);
        emit ApproveForAll(token, TOKEN_ERC_ERC1155, address(this), spender, approved);
    }

    ///
    /// ============ transfer ============
    ///
    event Transfer(address indexed token, uint erc, uint16 allocationId, address indexed from, address indexed to, uint256 tokenId, uint256 value);
    event TransferBatch(address indexed token, uint erc, uint16[] allocationIds, address indexed from, address indexed to, uint256[] ids, uint256[] amounts);

    function ERC20Transfer(address token, uint16 allocationId, address to, uint256 value) external onlyRoleForToken(TRANSFER_ROLE, token) whenNotPaused() {
        IERC20(token).transfer(to, value);
        _spendAllocation(token, TOKEN_ERC_ERC20, AllocationTypeTransfer, allocationId, 0, value);
        emit Transfer(token, TOKEN_ERC_ERC20, allocationId, address(this), to, 0, value);
    }

    function ERC721Transfer(address token, uint16 allocationId, address to, uint256 tokenId) external onlyRoleForToken(TRANSFER_ROLE, token) whenNotPaused() {
        IERC721(token).transferFrom(address(this), to, tokenId);
        _spendAllocation(token, TOKEN_ERC_ERC721, AllocationTypeTransfer, allocationId, tokenId, 0);
        emit Transfer(token, TOKEN_ERC_ERC721, allocationId, address(this), to, tokenId, 0);
    }

    function ERC721SafeTransferFrom(address token, uint16 allocationId, address to, uint256 tokenId, bytes calldata data) external onlyRoleForToken(TRANSFER_ROLE, token) whenNotPaused() {
        IERC721(token).safeTransferFrom(address(this), to, tokenId, data);
        _spendAllocation(token, TOKEN_ERC_ERC721, AllocationTypeTransfer, allocationId, tokenId, 0);
        emit Transfer(token, TOKEN_ERC_ERC721, allocationId, address(this), to, tokenId, 0);
    }

    function ERC1155SafeTransferFrom(address token, uint16 allocationId, address to, uint256 id, uint256 amount, bytes memory data) external onlyRoleForToken(TRANSFER_ROLE, token) whenNotPaused() {
        IERC1155(token).safeTransferFrom(address(this), to, id, amount, data);
        _spendAllocation(token, TOKEN_ERC_ERC1155, AllocationTypeTransfer, allocationId, id, amount);
        emit Transfer(token, TOKEN_ERC_ERC1155, allocationId, address(this), to, id, amount);
    }

    function ERC1155SafeBatchTransferFrom(address token, uint16[] memory allocationIds, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external onlyRoleForToken(TRANSFER_ROLE, token) whenNotPaused() {
        IERC1155(token).safeBatchTransferFrom(address(this), to, ids, amounts, data);
        for (uint i = 0; i < ids.length; i++) {
            _spendAllocation(token, TOKEN_ERC_ERC1155, AllocationTypeTransfer, allocationIds[i], ids[i], amounts[i]);
        }
        emit TransferBatch(token, TOKEN_ERC_ERC1155, allocationIds, address(this), to, ids, amounts);
    }

    function CoinTransfer(uint16 allocationId, address to, uint256 value) external onlyRoleForToken(TRANSFER_ROLE, address(0)) whenNotPaused() {
        require(value <= address(this).balance, "must value <= balance");
        Address.sendValue(payable(to), value);
        _spendAllocation(address(0), TOKEN_ERC_COIN, AllocationTypeTransfer, allocationId, 0, value);
        emit Transfer(address(0), TOKEN_ERC_COIN, allocationId, address(this), to, 0, value);
    }

    ///
    /// ============ claim ============
    ///
    event Claim(address indexed token, uint erc, uint16 allocationId, address indexed to, uint256 tokenId, uint256 value);

    /// @dev IERC721 claim
    function ERC721Claim(address token, uint16 allocationId, uint256 tokenId, address to) external onlyRoleForToken(MINTER_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).claim(tokenId, to);
        _spendAllocation(token, TOKEN_ERC_ERC721, AllocationTypeMint, allocationId, tokenId, 0);
        emit Claim(token, TOKEN_ERC_ERC721, allocationId, to, tokenId, 0);
    }

    ///
    /// ============ mint ============
    ///
    event Mint(address indexed token, uint erc, uint16 allocationId, address indexed to, uint256 id, uint256 amount);
    event MintBatch(address indexed token, uint erc, uint16[] allocationIds, address indexed to, uint256[] ids, uint256[] amounts);

    /// @dev ERC20 Mint
    function ERC20Mint(address token, uint16 allocationId, address to, uint256 amount) external onlyRoleForToken(MINTER_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).mint(to, amount);
        _spendAllocation(token, TOKEN_ERC_ERC20, AllocationTypeMint, allocationId, 0, amount);
        emit Mint(token, TOKEN_ERC_ERC20, allocationId, to, 0, amount);
    }

    /// @dev ERC721 Mint
    function ERC721Mint(address token, uint16 allocationId, address to) external onlyRoleForToken(MINTER_ROLE, token) whenNotPaused() returns (uint256) {
        uint tokenId = IERCMintBurnClaimRole(token).mint(to);
        _spendAllocation(token, TOKEN_ERC_ERC721, AllocationTypeMint, allocationId, tokenId, 0);
        emit Mint(token, TOKEN_ERC_ERC721, allocationId, to, tokenId, 1);
        return tokenId;
    }

    /// @dev ERC721 MintBatch
    function ERC721MintBatch(address token, uint16 allocationId, address to, uint256 amount) external onlyRoleForToken(MINTER_ROLE, token) whenNotPaused() {
        uint[] memory ids = IERCMintBurnClaimRole(token).mintBatch(to, amount);
        for (uint i = 0; i < ids.length; i++) {
            _spendAllocation(token, TOKEN_ERC_ERC721, AllocationTypeMint, allocationId, ids[i], 0);
        }
        uint16[] memory allocationIds = new uint16[](1);
        allocationIds[0] = allocationId;
        emit MintBatch(token, TOKEN_ERC_ERC721, allocationIds, to, ids, new uint[](0));
    }

    /// @dev ERC1155 Mint
    function ERC1155Mint(address token, uint16 allocationId, address to, uint256 id, uint256 amount, bytes memory data) external onlyRoleForToken(MINTER_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).mint(to, id, amount, data);
        _spendAllocation(token, TOKEN_ERC_ERC1155, AllocationTypeMint, allocationId, id, amount);
        emit Mint(token, TOKEN_ERC_ERC1155, allocationId, to, id, amount);
    }

    /// @dev ERC1155 MintBatch
    function ERC1155MintBatch(address token, uint16[] memory allocationIds, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external onlyRoleForToken(MINTER_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).mintBatch(to, ids, amounts, data);
        for (uint i = 0; i < ids.length; i++) {
            _spendAllocation(token, TOKEN_ERC_ERC1155, AllocationTypeMint, allocationIds[i], ids[i], amounts[i]);
        }
        emit MintBatch(token, TOKEN_ERC_ERC1155, allocationIds, to, ids, amounts);
    }

    ///
    /// ============ burn ============
    ///
    event Burn(address indexed token, uint erc, uint16 allocationId, address indexed account, uint256 id, uint256 amount);
    event BurnBatch(address indexed token, uint erc, uint16 allocationId, address indexed account, uint256[] ids, uint256[] amounts);
    /// @dev IERC20 burnFrom
    // function ERC20BurnFrom(address token, uint16 allocationId, address account, uint256 amount) external onlyRoleForToken(BURN_ROLE, token) whenNotPaused() {
    //     IERCMintBurnClaimRole(token).burnFrom(account, amount);
    //     emit Burn(token, TOKEN_ERC_ERC20, allocationId, account, 0, amount);
    // }

    /// @dev ERC20 burn
    function ERC20Burn(address token, uint16 allocationId, uint256 amount) external onlyRoleForToken(BURN_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).burn(amount);
        _spendAllocation(token, TOKEN_ERC_ERC20, AllocationTypeTransfer, true, allocationId, 0, amount);
        emit Burn(token, TOKEN_ERC_ERC20, allocationId, address(0), 0, amount);
    }

    /// @dev ERC721 burn
    function ERC721Burn(address token, uint16 allocationId, uint256 id) external onlyRoleForToken(BURN_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).burn(id);
        _spendAllocation(token, TOKEN_ERC_ERC721, AllocationTypeTransfer, true, allocationId, id, 0);
        emit Burn(token, TOKEN_ERC_ERC721, allocationId, address(0), id, 0);
    }

    /// @dev ERC721 burnBatch
    function ERC721BurnBatch(address token, uint16 allocationId, uint256[] memory ids) external onlyRoleForToken(BURN_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).burnBatch(ids);
        for (uint i = 0; i < ids.length; i++) {
            _spendAllocation(token, TOKEN_ERC_ERC721, AllocationTypeTransfer, true, allocationId, ids[i], 0);
        }
        emit BurnBatch(token, TOKEN_ERC_ERC721, allocationId, address(0), ids, new uint[](0));
    }

    /// @dev ERC1155 burn
    function ERC1155Burn(address token, uint16 allocationId, address account, uint256 id, uint256 amount) external onlyRoleForToken(BURN_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).burn(account, id, amount);
        _spendAllocation(token, TOKEN_ERC_ERC1155, AllocationTypeTransfer, true, allocationId, id, amount);
        emit Burn(token, TOKEN_ERC_ERC1155, allocationId, account, id, amount);
    }

    /// @dev ERC1155 burnBatch
    function ERC1155BurnBatch(address token, uint16 allocationId, address account, uint256[] memory ids, uint256[] memory amounts) external onlyRoleForToken(BURN_ROLE, token) whenNotPaused() {
        IERCMintBurnClaimRole(token).burnBatch(account, ids, amounts);
        for (uint i = 0; i < ids.length; i++) {
            _spendAllocation(token, TOKEN_ERC_ERC1155, AllocationTypeTransfer, true, allocationId, ids[i], amounts[i]);
        }
        emit BurnBatch(token, TOKEN_ERC_ERC1155, allocationId, account, ids, amounts);
    }

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data) external pure returns (bytes4) {
        operator;
        from;
        id;
        data;
        value;
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address operator, address from, uint256[] calldata ids, uint256[] calldata values, bytes calldata data) external pure returns (bytes4) {
        operator;
        from;
        ids;
        values;
        data;
        return this.onERC1155BatchReceived.selector;
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external pure returns (bytes4) {
        operator;
        from;
        tokenId;
        data;
        return this.onERC721Received.selector;
    }

    event FunctionCall(address indexed caller, address indexed target, bytes data);

    function functionCall(address target, uint256 value, bytes memory data) public onlyRole(FUNCTION_ROLE) {
        // console.log("------------- PoolToken functionCall target",target);
        // console.log("------------- PoolToken functionCall value",value);
        // console.log("------------- PoolToken functionCall data",string(data));

        string memory errorMessage = "PoolToken: functionCall reverted without message";
        (bool success, bytes memory returnData) = target.call{value: value}(data);
        Address.verifyCallResult(success, returnData, errorMessage);

        emit FunctionCall(_msgSender(), target, data);
    }
}
