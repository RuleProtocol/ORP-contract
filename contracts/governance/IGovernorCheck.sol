pragma solidity ^0.8.0;
import "../V3/struct/Rule.sol";

interface IGovernorCheck{

    struct GovernorCheckData{
        address caller;
        address  clusterRuleAreaAddress;
        uint32  clusterId;
        uint16  ruleSlotIndexInput;
        uint16  ruleSlotIndexOutput;
        uint8 groupInputBranch;
    }
    function check(Token.Token[] memory inTokenList,GovernorCheckData memory governorCheckData) external virtual;

    function getSucceedParams(GovernorCheckData memory governorCheckData,uint8 voteMode) external view returns(uint16,uint16);

}
