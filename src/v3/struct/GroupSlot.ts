// @ts-nocheck

import { BigNumberish, BytesLike } from "ethers";
import { TokenSlot } from "./TokenSlot";
import { Helper } from "../util";

export class GroupSlot {
  tokenSlotList: TokenSlot[] = [];

  branch: BigNumberish;
  poolToken: string;

  handlerList: string[] = [];
  argsList: BytesLike[] = [];
  argsValueList: object[] = [];

  id: number;//flag to which groupSlot[]

  constructor(poolToken: string, branch: BigNumberish, handlerList: [] = [], argsList: BytesLike[] = []) {
    this.branch = branch;
    this.poolToken = poolToken;
    this.handlerList = handlerList;
    this.argsList = argsList;
  }

  addArgs(handler: string, args: any) {
    this.handlerList.push(handler);
    this.argsList.push(Helper.rlp(args));
  }

  public addTokenSlot(tokenSlot: TokenSlot) {
    // if (SDK_CHECK && this.branch == 0) {
    //   throw Error("GroupSlot0's tokenSlotList must be empty");
    // }
    this.tokenSlotList.push(tokenSlot);
  }

}
