//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../PoolTokenStruct.sol";


interface IPoolToken {


    function name() external view virtual returns (string memory);

    function symbol() external view virtual returns (string memory);

    function version() external pure returns (uint);

    function cname() external pure returns (string memory);

    ///
    /// ============ manage ============
    function addTokens(TokenInfo memory tokenInfo, bool add) external;

    function allTokens() external view returns (TokenInfo[] memory tokenInfos);

    function getAllocation(address token, uint tokenId, uint8 allocationType) external view returns (AmountAllocation[] memory);

    function getIdAllocation(address token, uint8 allocationType) external view returns (IdAllocationView[] memory);

    event AddCap(address indexed token, uint erc, uint16 allocationId, uint256 id, uint256 amount);
    event BurnFailed(address indexed token, uint erc, uint16 allocationId, uint256 id, uint256 amount);
    event AddCapFailed(address indexed token, uint erc, uint16 allocationId, uint256 id, uint256 amount);

    function allocate(AllocationParams memory params) external;

    function idAllocate(AllocationParams memory params) external;

    function tryBurn(address token, uint8 erc, uint tokenId, uint amount) external;

    function tryAddCap(address token, uint8 erc, uint tokenId, uint cap) external;

    function recordInput(address token, uint16 allocationId, uint tokenId, uint amount) external;


    /// control
    function pause(bool _paused) external;

    ///
    /// ============ approve ============
    ///
    event Approval(address indexed token, uint erc, address indexed owner, address indexed spender, uint256 tokenId, uint256 amount);
    event ApproveForAll(address indexed token, uint erc, address indexed owner, address indexed spender, bool approved);

    function ERC20Approve(address token, address spender, uint256 amount) external;

    function ERC721Approve(address token, address spender, uint256 tokenId) external;

    function ERC721ApproveForAll(address token, address spender, bool approved) external;

    function ERC1155ApproveForAll(address token, address spender, bool approved) external;

    ///
    /// ============ transfer ============
    ///
    event Transfer(address indexed token, uint erc, uint16 allocationId, address indexed from, address indexed to, uint256 tokenId, uint256 value);
    event TransferBatch(address indexed token, uint erc, uint16[] allocationIds, address indexed from, address indexed to, uint256[] ids, uint256[] amounts);

    function ERC20Transfer(address token, uint16 allocationId, address to, uint256 value) external;

    function ERC721Transfer(address token, uint16 allocationId, address to, uint256 tokenId) external;

    function ERC721SafeTransferFrom(address token, uint16 allocationId, address to, uint256 tokenId, bytes calldata data) external;

    function ERC1155SafeTransferFrom(address token, uint16 allocationId, address to, uint256 id, uint256 amount, bytes memory data) external;

    function ERC1155SafeBatchTransferFrom(address token, uint16[] memory allocationIds, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external;

    function CoinTransfer(uint16 allocationId, address to, uint256 value) external;

    ///
    /// ============ claim ============
    ///
    event Claim(address indexed token, uint erc, uint16 allocationId, address indexed to, uint256 tokenId, uint256 value);

    /// @dev IERC721 claim
    function ERC721Claim(address token, uint16 allocationId, uint256 tokenId, address to) external;

    ///
    /// ============ mint ============
    ///
    event Mint(address indexed token, uint erc, uint16 allocationId, address indexed to, uint256 id, uint256 amount);
    event MintBatch(address indexed token, uint erc, uint16[] allocationIds, address indexed to, uint256[] ids, uint256[] amounts);

    /// @dev ERC20 Mint
    function ERC20Mint(address token, uint16 allocationId, address to, uint256 amount) external;

    /// @dev ERC721 Mint
    function ERC721Mint(address token, uint16 allocationId, address to) external returns (uint256);

    /// @dev ERC721 MintBatch
    function ERC721MintBatch(address token, uint16 allocationId, address to, uint256 amount) external;

    /// @dev ERC1155 Mint
    function ERC1155Mint(address token, uint16 allocationId, address to, uint256 id, uint256 amount, bytes memory data) external;

    /// @dev ERC1155 MintBatch
    function ERC1155MintBatch(address token, uint16[] memory allocationIds, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external;

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
    function ERC20Burn(address token, uint16 allocationId, uint256 amount) external;

    /// @dev ERC721 burn
    function ERC721Burn(address token, uint16 allocationId, uint256 id) external;

    /// @dev ERC721 burnBatch
    function ERC721BurnBatch(address token, uint16 allocationId, uint256[] memory ids) external;

    /// @dev ERC1155 burn
    function ERC1155Burn(address token, uint16 allocationId, address account, uint256 id, uint256 amount) external;

    /// @dev ERC1155 burnBatch
    function ERC1155BurnBatch(address token, uint16 allocationId, address account, uint256[] memory ids, uint256[] memory amounts) external;

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data) external pure returns (bytes4);

    function onERC1155BatchReceived(address operator, address from, uint256[] calldata ids, uint256[] calldata values, bytes calldata data) external pure returns (bytes4);

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external pure returns (bytes4);

    event FunctionCall(address indexed caller, address indexed target, bytes data);

    function functionCall(address target, uint256 value, bytes memory data) external;
}
