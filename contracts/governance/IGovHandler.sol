// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (governance/utils/IVotes.sol)
pragma solidity ^0.8.0;
import "../V3/struct/Token.sol";

/**
 * @dev Common interface for {ERC20Votes}, {ERC721Votes}, and other {Votes}-enabled contracts.
 *
 * _Available since v4.5._
 */
interface IGovHandler {
    function checkInTokenList(Token.Token[] memory inTokenList,uint256 proposalId) external returns(bool);
}