// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "../interface/IHandler.sol";
import "../struct/Cluster.sol";
import "../util/RLPUtil.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract GovHandler is Initializable,IVersion  {

    using RLPUtil for bytes;

    mapping(bytes32 => bytes) public ruleGroupSlotArgs;
    mapping(bytes32 => bool) public tokenUsed;

    function version() external pure override returns (uint){
        return 0;
    }

    function cname() external pure override returns (string memory){
        return "GovHandler";
    }


    function getState(Handler.StateParams memory params) public view returns (bytes[] memory){
        console.log("getState begin");
        address gov=params.args.fromHandlerAddress(0);
        console.log("getState gov",gov);
        address token=params.args.fromHandlerAddress(1);
        console.log("getState token",token);
        uint256 id=params.args.fromHandlerUint(2);
        console.log("getState id",id);
        uint256 proposalId=params.args.fromHandlerUint(3);
        console.log("getState proposalId",proposalId);
        bytes32 hash= keccak256(abi.encode(gov,token,id,proposalId));
        bytes[] memory res=new bytes[](1);
        res[0]=RLPUtil.toBool("used",tokenUsed[hash]);
        return res;
    }

    function checkInTokenList(Token.Token[] memory inTokenList,uint256 proposalId) public returns(bool){
        console.log("checkInTokenList begin");
        console.log("msg.sender",msg.sender);
        console.log("proposalId",proposalId);
        for(uint i=0;i<inTokenList.length;i++){
            if(inTokenList[i].erc==TOKEN_ERC_ERC721||inTokenList[i].erc==TOKEN_ERC_ERC1155){
                console.log("token",inTokenList[i].token);
                console.log("id",inTokenList[i].id);
                bytes32 hash= keccak256(abi.encode(msg.sender,inTokenList[i].token,inTokenList[i].id,proposalId));
                if(tokenUsed[hash]){
                    console.log("index used",i);
                    return false;
                }
                tokenUsed[hash]=true;
            }
        }
        console.log("checkInTokenList end");
        return true;
    }


    function regRuleGroupSlotArgs(uint32 clusterId, uint16 ruleSlotIndex, uint8 branch, bytes memory args) public {
        console.log("gov handler regRuleGroupSlotArgs begin");
        console.log("args length");
        console.log("args length",args.length);
        //msg.sender = clusterRuleArea
        bytes32 ruleSlotIndexBranchHash = keccak256(abi.encode(msg.sender, clusterId, ruleSlotIndex, branch));
        uint16 succeedFactor=uint16(args.fromHandlerUint(0));
        uint16 quorum=uint16(args.fromHandlerUint(1));
        uint16 quorumOne=uint16(args.fromHandlerUint(2));
        console.log("succeedFactor",succeedFactor);
        console.log("quorum",quorum);
        console.log("quorumOne",quorumOne);
        console.log("-----------Gov regRuleGroupSlotArgs branch", branch);
        ruleGroupSlotArgs[ruleSlotIndexBranchHash] = args;
        console.log("gov handler regRuleGroupSlotArgs end");
    }

    function getRuleGroupSlotArgs(uint32 clusterId, uint16 ruleSlotIndex, uint8 branch) public view returns (bytes memory){

        bytes32 ruleSlotIndexBranchHash = keccak256(abi.encode(msg.sender, clusterId, ruleSlotIndex, branch));

        bytes memory args = ruleGroupSlotArgs[ruleSlotIndexBranchHash];
        uint16 succeedFactor=uint16(args.fromHandlerUint(0));
        uint16 quorum=uint16(args.fromHandlerUint(1));
        uint16 quorumOne=uint16(args.fromHandlerUint(2));
        console.log("succeedFactor",succeedFactor);
        console.log("quorum",quorum);
        console.log("quorumOne",quorumOne);
        console.log("-----------Gov regRuleGroupSlotArgs branch", branch);
        return args;
    }

    function regRule(uint32 clusterId, Cluster.Cluster memory cluster) public{

    }

    function updateArgs(uint32 clusterId, uint16 ruleSlotIndexInput, uint16 ruleSlotIndexOutput, uint8 cmd, bytes memory args) public returns (bool) {

        return true;
    }





}
