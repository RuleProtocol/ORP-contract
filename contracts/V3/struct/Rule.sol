// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "../util/Bit.sol";
import "../util/StringUtil.sol";
import "hardhat/console.sol";
import "../struct/Constant.sol";
import "../util/Chain.sol";

library Rule {

    struct TokenSlot {
        Token.TokenTemplate tokenTemplate;
        uint8 rule; // for inputUse 0 in input tokens , 1 out withdraw tokens

        address[] ioAddressList; // input: receipt address, output: source address , 0x00 mint 0x12 user or contract address

        //DURATION_TYPE[] durationTypeList;
        //uint256[] durationBeginList;
        //uint256[] durationEndList;
        //uint16[] outputBranchList;

        //branch: input token output branch , this is used for pairing output group branch
        //durationType: timestamp-0,block-1
        //durationBegin: can be timestamp or block

        //32:business 8:ioType 32:durationEnd 32:durationBegin 8:durationType,timestamp-0,block-1,16:branch
        uint256[] valueList;
    }

    struct GroupSlot {
        TokenSlot[] tokenSlotList;

        uint8 branch;
        address poolToken;//token holdings of user inputs

        address[] handlerList;//one groupSlot can be used by different handler
        bytes[] argsList;
    }

    struct RuleSlot {
        uint16 ruleSlotIndex;
        GroupSlot[] groupSlotList;
        uint8[] groupSlotOptList;
    }

    struct Rule {

        uint16 ruleSlotIndexInput;
        uint16 ruleSlotIndexOutput;
        uint8 state;
        uint32 totalCount;

        uint8 durationType;// 0 timestamp 1 block.number
        uint32 delayTimestamp;//32:delay block number  32delay seconds to execute task
        uint32 delayBlockNumber;

        uint64 handlerCount;
        address[] handlerList;
        bytes[] handlerArgsList;//init args , only do it in regRule or addRule.
        address snippet;

    }


}
