// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../struct/Rule.sol";

interface IClusterRuleArea {

    function version() external pure returns(uint);
    function cname() external pure returns(string memory);

    function getGroupSlot(uint32 clusterId,uint16 ruleSlotIndex,uint8 branch) external view returns(bool found,Rule.GroupSlot memory);
    function getGroupSlotHandlerArgs(uint32 clusterId,uint16 ruleSlotIndex,uint8 branch,address handler) external view returns(bytes memory);
}
