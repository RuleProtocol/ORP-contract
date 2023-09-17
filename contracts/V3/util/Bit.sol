// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Bit {

    function bitValue(uint256 value, uint256 bit, uint256 shift) internal pure returns (uint256){
        //todo bit >=256 need to conform
        value = value >> shift;
        uint256 mask = (1 << bit) - 1;
        return value & mask;
    }

    //value origin value
    //bitValue to set on shift
    //bit : span
    //shift :
    function bit(uint256 value, uint256 bitValue, uint256 bit, uint256 shift) internal pure returns (uint256){
        uint256 bitShiftValue = bitValue << shift;
        uint256 mask = ~(((1 << bit) - 1) << shift);
        return value & mask | bitShiftValue;
    }

}
