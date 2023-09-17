// @ts-nocheck

import { BigNumberish } from "ethers";
import { GroupSlot } from "./GroupSlot";

export class RuleSlot {

  ruleSlotIndex: number;
  groupSlotList: GroupSlot[];
  groupSlotOptList: BigNumberish[];

  constructor(ruleSlotIndex: BigNumberish, groupSlotList: GroupSlot[], groupSlotOptList: BigNumberish[] = []) {
    this.ruleSlotIndex = ruleSlotIndex;
    this.groupSlotList = groupSlotList;
    this.groupSlotOptList = groupSlotOptList;

    if (groupSlotOptList.length > 0 && groupSlotOptList.length != groupSlotList.length) {
      throw Error(`ruleSlotIndex ${ruleSlotIndex} groupSlotOptList.length != groupSlotList.length`);
    }

    this.init();
  }

  public init() {
    for (let i = 0; i < this.groupSlotList.length; ++i) {
      for (let j = 0; j < this.groupSlotList[i].tokenSlotList.length; ++j) {
        this.groupSlotList[i].tokenSlotList[j].bitEncode();
      }
    }
  }

  public static new(ruleSlotIndex: BigNumberish, groupSlotList: GroupSlot[], groupSlotOptList: BigNumberish[] = []) {
    return new RuleSlot(ruleSlotIndex, groupSlotList, groupSlotOptList);
  }

}
