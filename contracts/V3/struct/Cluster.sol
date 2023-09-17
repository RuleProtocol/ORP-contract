pragma solidity ^0.8.0;
import "./Rule.sol";

library Cluster {

    struct Attribute{
        uint32 attrId;
        string name;
        string symbol;
        string uri;
        uint8 level;
    }

    struct Cluster {

        Rule.GroupSlot[] groupSlotList;//[0,1,2,3][4,5,6][7,8,9,10]
        uint8[] ruleSlotBound;//[4,7,11]

        Rule.Rule[] ruleList;
        Attribute[] attrList;
        uint8[] attrStateList;

        address[] deployerList;
        address[] adminList;
        uint32 delayTimestamp;//32:delay block number  32delay seconds to execute task
        uint32 delayBlockNumber;
        uint8 state;
        string description;
    }
}
