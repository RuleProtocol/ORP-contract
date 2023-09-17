// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "../interface/IHandler.sol";

library Handler {

    struct StateParams {
        address engine;
        address clusterArea;
        uint32 clusterId;
        uint16 ruleSlotIndexInput;
        uint16 ruleSlotIndexOutput;
        uint8 branch;
        address stateCounter;
        uint32 taskId;
        address caller;
        uint8 cmd;
        bytes args;
    }


}
