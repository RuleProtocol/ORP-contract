// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

/// @title ERC operation
interface IERCMintBurnClaimRole {

    function getRoleAdmin(bytes32 role) external view returns (bytes32);

    function hasRole(bytes32 role, address account) external view returns (bool);

    function grantRole(bytes32 role, address account) external;

    function revokeRole(bytes32 role, address account) external;

    function renounceRole(bytes32 role, address account) external;

    //compatible with uint8
    function decimals() external view returns (uint);

    /// @dev IERC721 claim
    function claim(uint256, address) external;

    /// @dev IERC721 cap
    function cap() external view returns (uint256);
    // 1155
    function cap(uint id) external view returns (uint256);

    ///
    /// ============ mint ============
    ///
    // 721 20
    function addCap(uint256 _cap) external;
    // 1155
    function addCap(uint256 tokenId, uint256 _cap) external;

    /// @dev ERC20 Mint
    function mint(address, uint256) external;

    /// @dev ERC721 Mint
    function mint(address) external returns (uint256);

    /// @dev ERC721 MintBatch
    function mintBatch(address, uint) external returns (uint[] memory);

    /// @dev ERC1155 Mint
    function mint(
        address,
        uint256,
        uint256,
        bytes calldata
    ) external;

    /// @dev ERC1155 MintBatch
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external;

    ///
    /// ============ burn ============
    ///

    /// @dev IERC20 burnFrom
    function burnFrom(address, uint256) external;

    /// @dev ERC20 & ERC721 burn
    function burn(uint256) external;

    /// @dev ERC721 burnBatch
    function burnBatch(uint256[] memory ids) external;

    /// @dev ERC1155 burn
    function burn(
        address,
        uint256,
        uint256
    ) external;

    /// @dev ERC1155 burnBatch
    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) external;
}
