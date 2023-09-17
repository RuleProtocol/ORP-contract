// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../struct/Handler.sol";
import "./IVersion.sol";

interface IHandler is IVersion {

    function getState(Handler.StateParams memory params) external view returns(bytes[] memory);

    function regRuleGroupSlotArgs(uint32 clusterId, uint16 ruleSlotIndex, uint8 branch, bytes memory args) external;

    function getRuleGroupSlotArgs(uint32 clusterId, uint16 ruleSlotIndex, uint8 branch) external view returns (bytes memory);

}
