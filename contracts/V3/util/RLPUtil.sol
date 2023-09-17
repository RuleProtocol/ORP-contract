pragma solidity ^0.8.0;

import "./StringUtil.sol";
import "../rlp/RLPEncode.sol";
import "../rlp/RLPDecode.sol";
import "hardhat/console.sol";

library RLPUtil {

    using RLPDecode for bytes;
    using RLPDecode for RLPDecode.RLPItem;

    //[
    //  toUnit("test",123),
    //  toString("test-s","good"),
    //]
    function toList(bytes[] memory bytesList) internal pure returns(bytes memory){
        bytes memory res = RLPEncode.encodeList(bytesList);
        return res;
    }


    function toUint(string memory name,uint value) internal view returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);
        bytes memory enValue = RLPEncode.encodeUint(value);

        console.log("------- toUint",S.b2s(bytes32(enValue)));

        bytes[] memory enList = new bytes[](3);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("uint");
        enList[2] = enValue;

        return RLPEncode.encodeList(enList);
    }

    function toUintList(string memory name,uint[] memory valueList) internal view returns(bytes memory){
        bytes memory enName = RLPEncode.encodeString(name);

        bytes[] memory enList = new bytes[](valueList.length + 2);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("uintList");

        for(uint i ; i < valueList.length; ++i){
            enList[2+i] = RLPEncode.encodeUint(valueList[i]);
        }


        return RLPEncode.encodeList(enList);
    }

    function toInt(string memory name,int value) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);
        bytes memory enValue = RLPEncode.encodeInt(value);

        bytes[] memory enList = new bytes[](3);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("int");
        enList[2] = enValue;

        return RLPEncode.encodeList(enList);
    }

    function toIntList(string memory name,int[] memory valueList) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);

        bytes[] memory enList = new bytes[](valueList.length + 2);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("intList");

        for(uint i ; i < valueList.length; ++i){
            enList[i+2] = RLPEncode.encodeInt(valueList[i]);
        }


        return RLPEncode.encodeList(enList);
    }

    function toString(string memory name,string memory value) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);
        bytes memory enValue = RLPEncode.encodeString(value);

        bytes[] memory enList = new bytes[](3);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("string");
        enList[2] = enValue;

        return RLPEncode.encodeList(enList);
    }

    function toStringList(string memory name,string[] memory valueList) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);

        bytes[] memory enList = new bytes[](valueList.length + 2);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("stringList");

        for(uint i ; i < valueList.length; ++i){
            enList[i+2] = RLPEncode.encodeString(valueList[i]);
        }

        return RLPEncode.encodeList(enList);
    }

    function toAddress(string memory name,address value) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);
        bytes memory enValue = RLPEncode.encodeAddress(value);

        bytes[] memory enList = new bytes[](3);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("address");
        enList[2] = enValue;

        return RLPEncode.encodeList(enList);
    }

    function toAddressList(string memory name,address[] memory valueList) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);

        bytes[] memory enList = new bytes[](valueList.length + 2);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("addressList");

        for(uint i ; i < valueList.length; ++i){
            enList[i+2] = RLPEncode.encodeAddress(valueList[i]);
        }

        return RLPEncode.encodeList(enList);
    }


    function toBool(string memory name,bool value) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);
        bytes memory enValue = RLPEncode.encodeBool(value);

        bytes[] memory enList = new bytes[](3);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("bool");
        enList[2] = enValue;

        return RLPEncode.encodeList(enList);
    }

    function toBoolList(string memory name,bool[] memory valueList) internal pure returns(bytes memory){

        bytes memory enName = RLPEncode.encodeString(name);

        bytes[] memory enList = new bytes[](valueList.length + 2);
        enList[0] = enName;
        enList[1] = RLPEncode.encodeString("boolList");

        for(uint i ; i < valueList.length; ++i){
            enList[i+2] = RLPEncode.encodeBool(valueList[i]);
        }

        return RLPEncode.encodeList(enList);
    }

    //["test","uint",123]
    function fromUint(bytes memory value) internal view returns(uint){
        RLPDecode.RLPItem[] memory rlpItemList = value.toRlpItem().toList();
        return rlpItemList[2].toUint();
    }


    function fromHandler(bytes memory args) internal pure returns(RLPDecode.RLPItem[] memory){
        RLPDecode.RLPItem[] memory rlpItemList = args.toRlpItem().toList();
        return rlpItemList;
    }

    //args = [
    //  ["test","uint",123],
    //  ["test-s","string","good"],
    //]
    function fromHandlerUint(bytes memory args,uint8 argsIndex) internal pure returns(uint){
        RLPDecode.RLPItem[] memory rlpItemList = args.toRlpItem().toList();
        return rlpItemList[argsIndex].toList()[2].toUint();
    }

    function fromHandlerBytes(bytes memory args,uint8 argsIndex) internal pure returns(bytes memory){
        RLPDecode.RLPItem[] memory rlpItemList = args.toRlpItem().toList();
        return rlpItemList[argsIndex].toList()[2].toBytes();
    }

    function fromHandlerAddress(bytes memory args,uint8 argsIndex) internal pure returns(address){
        RLPDecode.RLPItem[] memory rlpItemList = args.toRlpItem().toList();
        return rlpItemList[argsIndex].toList()[2].toAddress();
    }

    function fromHandlerBool(bytes memory args,uint8 argsIndex) internal pure returns(bool){
        RLPDecode.RLPItem[] memory rlpItemList = args.toRlpItem().toList();
        return rlpItemList[argsIndex].toList()[2].toBoolean();
    }

    function fromHandlerList(bytes memory args,uint8 argsIndex) internal pure returns(RLPDecode.RLPItem[] memory){
        RLPDecode.RLPItem[] memory rlpItemList = args.toRlpItem().toList();
        return rlpItemList[argsIndex].toList()[2].toList();
    }

}
