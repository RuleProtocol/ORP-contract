// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";

library S {


    function cs2(string memory a,string memory b) internal pure returns(string memory){
        return string(abi.encodePacked(a,",", b));
    }

    function cs3(string memory a,string memory b,string memory c) internal pure returns(string memory){
        return string(abi.encodePacked(a,",", b,",", c));
    }

    function cs4(string memory a,string memory b,string memory c,string memory d) internal pure returns(string memory){
        return string(abi.encodePacked(a,",", b, ",", c,",", d));
    }

    function cs5(string memory a,string memory b,string memory c,string memory d,string memory e) internal pure returns(string memory){
        return string(abi.encodePacked(a,",", b,",", c,",", d,",", e));
    }

    function cs6(string memory a,string memory b,string memory c,string memory d,string memory e,string memory f) internal pure returns(string memory){
        return string(abi.encodePacked(a,",", b,",", c,",", d,",", e,",", f));
    }

    function cs7(string memory a,string memory b,string memory c,string memory d,string memory e,string memory f,string memory g) internal pure returns(string memory){
        return string(abi.encodePacked(a,",", b,",", c,",", d,",", e,",", f,",", g));
    }

    function cs8(string memory a,string memory b,string memory c,string memory d,string memory e,string memory f,string memory g,string memory h) internal pure returns(string memory){
        return string(abi.encodePacked(a,",", b,",", c,",", d,",", e,",", f,",", g,",", h));
    }

    function concatAddress(string memory a,address addr) internal pure returns(string memory){
        string memory addrStr = a2s(addr);
        return string(abi.encodePacked(a, addrStr));
    }

    function concatString(string memory a,string memory b) internal pure returns(string memory){
        return string(abi.encodePacked(a, b));
    }

    function concatUint(string memory a,uint b) internal pure returns(string memory){
        return string(abi.encodePacked(a, Strings.toString(b)));
    }

    //addressToString
    function a2s(address addr) internal pure returns(string memory){
        return Strings.toHexString(uint256(uint160(addr)), 20);
    }

    //uintToString
    function u2s(uint a) internal pure returns(string memory){
        return Strings.toString(a);
    }

    function b2s(bytes32 data) internal pure returns (string memory) {
        return string (abi.encodePacked ("0x", toHex16 (bytes16 (data)), toHex16 (bytes16 (data << 128))));
    }

    function toHex16 (bytes16 data) internal pure returns (bytes32 result) {
        result = bytes32 (data) & 0xFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000 |
        (bytes32 (data) & 0x0000000000000000FFFFFFFFFFFFFFFF00000000000000000000000000000000) >> 64;
        result = result & 0xFFFFFFFF000000000000000000000000FFFFFFFF000000000000000000000000 |
        (result & 0x00000000FFFFFFFF000000000000000000000000FFFFFFFF0000000000000000) >> 32;
        result = result & 0xFFFF000000000000FFFF000000000000FFFF000000000000FFFF000000000000 |
        (result & 0x0000FFFF000000000000FFFF000000000000FFFF000000000000FFFF00000000) >> 16;
        result = result & 0xFF000000FF000000FF000000FF000000FF000000FF000000FF000000FF000000 |
        (result & 0x00FF000000FF000000FF000000FF000000FF000000FF000000FF000000FF0000) >> 8;
        result = (result & 0xF000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000) >> 4 |
        (result & 0x0F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F00) >> 8;
        result = bytes32 (0x3030303030303030303030303030303030303030303030303030303030303030 +
        uint256 (result) +
            (uint256 (result) + 0x0606060606060606060606060606060606060606060606060606060606060606 >> 4 &
            0x0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F) * 7);
    }

    function stringToUint(string memory s) internal pure returns(uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for(uint i = 0; i < b.length; i++) {
            if(uint8(b[i]) >= 48 && uint8(b[i]) <= 57) {
                result = result * 10 + (uint8(b[i]) - 48);
            }
        }
        return result;
    }

    function bytesToBytes32(bytes memory source) internal pure returns (bytes32 result) {
        if (source.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
