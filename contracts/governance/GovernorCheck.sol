pragma solidity ^0.8.0;

import "../V3/struct/Rule.sol";
import "../V3/interface/IClusterRuleArea.sol";
import "../V3/struct/Token.sol";
import "../V3/struct/Constant.sol";
import "./IGovernorCheck.sol";
import "./IGovHandler.sol";
import "../V3/util/RLPUtil.sol";
import "../V3/util/Transfer.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "hardhat/console.sol";


library GovernorCheck {
    using RLPUtil for bytes;
    uint8 public constant voteFairMode = 2;

    struct GovernorCheckData {
        address caller;
        address clusterRuleAreaAddress;
        uint32 clusterId;
        uint16 ruleSlotIndexInput;
        uint16 ruleSlotIndexOutput;
        uint8 groupInputBranch;
    }

    function check(Token.Token[] memory inTokenList, GovernorCheckData memory governorCheckData) external {
        console.log("---clusterAreaAddress---", governorCheckData.clusterRuleAreaAddress);
        console.log("---clusterId---", governorCheckData.clusterId);
        console.log("---ruleSlotIndexInput---", governorCheckData.ruleSlotIndexInput);
        console.log("---ruleSlotIndexOutput---", governorCheckData.ruleSlotIndexOutput);
        console.log("---caller---", governorCheckData.caller);

        (bool foundInput,Rule.GroupSlot memory stdGroupSlotInput) =
        IClusterRuleArea(governorCheckData.clusterRuleAreaAddress).getGroupSlot(governorCheckData.clusterId, governorCheckData.ruleSlotIndexInput, governorCheckData.groupInputBranch);
        console.log("----foundInput ----", foundInput);
        for (uint8 inTokenIndex; inTokenIndex < inTokenList.length; ++inTokenIndex) {
            Token.Token memory memToken = inTokenList[inTokenIndex];
            Token.TokenTemplate memory stdToken = stdGroupSlotInput.tokenSlotList[inTokenIndex].tokenTemplate;


            Token.tokenCheckMatchStdInput(inTokenIndex, stdToken, memToken);

            bool needTokenRequiredExist = Token.checkTokenRequiredExist(stdToken);

            // gasLeftLast = gas("------======------ gas 6-1", gasLeftLast);

            if (needTokenRequiredExist) {
                checkInputToken(governorCheckData.caller, memToken, 10000);
                console.log("-----check:token need exist pass");
            } else {
                bool needTokenRequiredNone = Token.checkTokenRequiredNone(stdToken);
                if (needTokenRequiredNone) {
                    console.log("------engine inputToken needTokenRequiredNone");
                }
                else {
                    _processInputTransfer(governorCheckData.caller, 10000, stdGroupSlotInput.tokenSlotList[inTokenIndex].ioAddressList[0], memToken);
                }

            }

            console.log("-----check:finish");
        }

    }

    function checkToken(address govHandler,uint256 proposalId,Token.Token[] memory inTokenList, GovernorCheckData memory governorCheckData) external {
        console.log("---clusterAreaAddress---", governorCheckData.clusterRuleAreaAddress);
        console.log("---clusterId---", governorCheckData.clusterId);
        console.log("---ruleSlotIndexInput---", governorCheckData.ruleSlotIndexInput);
        console.log("---ruleSlotIndexOutput---", governorCheckData.ruleSlotIndexOutput);
        console.log("---caller---", governorCheckData.caller);

        (bool foundInput,Rule.GroupSlot memory stdGroupSlotInput) =
        IClusterRuleArea(governorCheckData.clusterRuleAreaAddress).getGroupSlot(governorCheckData.clusterId, governorCheckData.ruleSlotIndexInput, governorCheckData.groupInputBranch);
        console.log("----foundInput ----", foundInput);
        for (uint8 inTokenIndex; inTokenIndex < inTokenList.length; ++inTokenIndex) {
            console.log("token check 1");
            Token.Token memory memToken = inTokenList[inTokenIndex];
            Token.TokenTemplate memory stdToken = stdGroupSlotInput.tokenSlotList[inTokenIndex].tokenTemplate;
            console.log("token check 2");
            console.log("memToken address",memToken.token);
            console.log("std address",stdToken.token);
            console.log("memToken erc",memToken.erc);
            console.log("std erc",stdToken.erc);

            Token.tokenCheckMatchStdInput(inTokenIndex, stdToken, memToken);
            console.log("token check 3");

            bool needTokenRequiredExist = Token.checkTokenRequiredExist(stdToken);
            console.log("token check 4");


            // gasLeftLast = gas("------======------ gas 6-1", gasLeftLast);

            if (needTokenRequiredExist) {
                console.log("token check 5");
                checkInputToken(governorCheckData.caller, memToken, 10000);
                console.log("-----check:token need exist pass");
            } else {
                console.log("token check 6");
                bool needTokenRequiredNone = Token.checkTokenRequiredNone(stdToken);
                if (needTokenRequiredNone) {
                    console.log("------engine inputToken needTokenRequiredNone");
                }
                else {
                    _processInputTransfer(governorCheckData.caller, 10000, stdGroupSlotInput.tokenSlotList[inTokenIndex].ioAddressList[0], memToken);
                }

            }

            console.log("-----check:finish");

        }
        console.log("token check 1 finish");
        bool tokenValid=IGovHandler(govHandler).checkInTokenList(inTokenList,proposalId);
        console.log(tokenValid);
        console.log("token check 2 finish");
        require(tokenValid,"token has been used for this proposal");
    }



    function _processInputTransfer(address caller, uint32 multiple, address inputAddress, Token.Token memory inputToken) internal {

        //burn
        if (inputAddress == MINT_DESTROY_ADDRESS) {
            //            console.log("---- task input burn");
        }
        //return
        else if (inputAddress == SELF_ADDRESS) {
            //            console.log("---- task input return");
            inputAddress = caller;
        }
        //send to other contract or wallet address
        else {
            //            console.log("---- task input transfer");
        }


        console.log("------_PIT -- to", inputAddress);


        console.log("------_PIT token", inputToken.token);
        console.log("------_PIT erc", Token.ercToString(inputToken.erc));
        console.log("------_PIT id", inputToken.id);
        console.log("------_PIT amount", inputToken.amount);

        if (inputToken.id != 0 || inputToken.amount != 0) {
            Transfer.transfer(caller, inputAddress, inputToken.erc, inputToken.token, inputToken.id,
                inputToken.amount);
        }
    }

    function getSucceedParams(GovernorCheckData memory governorCheckData, uint8 voteMode,address handlerAddress) external view returns (uint16, uint32) {
        console.log("handlerAddress",handlerAddress);
        console.log("clusterRuleAreaAddress", governorCheckData.clusterRuleAreaAddress);
        console.log("ruleSlotIndexInput", governorCheckData.ruleSlotIndexInput);
        console.log("ruleSlotIndexOutput", governorCheckData.ruleSlotIndexOutput);
        console.log("clusterId",governorCheckData.clusterId);
        console.log("branch",governorCheckData.groupInputBranch);
        //        (bool foundInput,Rule.GroupSlot memory stdGroupSlotInput) =
        //        IClusterRuleArea(governorCheckData.clusterRuleAreaAddress).getGroupSlot(governorCheckData.clusterId, governorCheckData.ruleSlotIndexInput, governorCheckData.groupInputBranch);
        bytes memory args=IClusterRuleArea(governorCheckData.clusterRuleAreaAddress).getGroupSlotHandlerArgs(governorCheckData.clusterId, governorCheckData.ruleSlotIndexInput, governorCheckData.groupInputBranch,handlerAddress);

        //        console.log("foundInput",foundInput);
        //        console.log("token length",stdGroupSlotInput.tokenSlotList.length);
        //        console.log("token address",stdGroupSlotInput.tokenSlotList[0].tokenTemplate.token);
        //        bytes memory args = stdGroupSlotInput.argsList[0];
        console.log("args length",args.length);
        if (voteMode == voteFairMode) {
            return (uint16(args.fromHandlerUint(0)), uint32(args.fromHandlerUint(2)));
        }
        return (uint16(args.fromHandlerUint(0)), uint32(args.fromHandlerUint(1)));
    }


    function checkInputToken(address caller,Token.Token memory memToken,uint16 multiple) internal{

        Transfer.checkBalance(
            caller,
            memToken.erc,
            memToken.token,
            memToken.id,
            memToken.amount*multiple/10000
        );
    }

}
