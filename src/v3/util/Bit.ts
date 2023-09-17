//@ts-nocheck
import { BigNumber } from "ethers";

export class Bit {

  // value = value >> shift;
  // uint256 mask = (1 << bit ) -1;
  static bitValue(value: BigNumber, bit, shift) {
    //todo bit >=256 need to conform
    value = BigNumber.from(value).shr(shift);
    let mask = BigNumber.from(1).shl(bit).sub(1);
    return value.and(mask);
  }

  //value origin value
  //bitValue to set on shift
  //bit : span
  //shift :
  static bit(value: BigNumber, bitValue: BigNumber, bit, shift) {
    let bitShiftValue = BigNumber.from(bitValue).shl(shift);
    let ori = BigNumber.from(1).shl(bit).sub(1).shl(shift);
    let m = BigNumber.from(1).shl(256).sub(1);
    let mask = ori.xor(m);

    return BigNumber.from(value).and(mask).or(bitShiftValue);


    // uint256 bitShiftValue = bitValue << shift;
    // uint256 mask = ~(( (1 << bit ) -1) << shift);
    //
    // return value & mask | bitShiftValue;
  }

  //int8 uint8
// -5 11111011 = 251
// -4 11111100 = 252
// -3 11111101 = 253
// +3 00000011 = 3
// +4 00000100 = 4
// +5 00000101 = 5
  static toSigned(value: BigNumber, bitMax) {
    if (bitMax == undefined) {
      throw Error("toSigned bitMax undefined");
    }
    if (BigNumber.from(value).gt(BigNumber.from(1).shl(bitMax - 1))) {
      let mask = BigNumber.from(1).shl(bitMax).sub(1);
      return BigNumber.from(value).xor(mask).add(1).mul(-1);
    }
    return value;
  }

  static toUnsigned(value: BigNumber, bitMax) {
    if (bitMax == undefined) {
      throw Error("toUnsigned bitMax undefined");
    }
    if (BigNumber.from(value).lt(BigNumber.from(0))) {
      let mask = BigNumber.from(1).shl(bitMax).sub(1);
      return BigNumber.from(value).mul(BigNumber.from(-1)).xor(mask).add(1);
    }
    return value;
  }

}

let main = function() {
  console.log(Bit.toUnsigned(-5, 8).toString());
  console.log(Bit.toSigned(253, 8).toString());
};

// main();
