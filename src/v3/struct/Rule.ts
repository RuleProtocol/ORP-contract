// @ts-nocheck

import { BigNumberish, BytesLike } from "ethers";
import * as util from "../util/Util";
import { RULE_STATE, SDK_CHECK, ZERO_ADDRESS } from "./Constant";
import { Bit, Helper } from "../util";

let BN = util.Util.BN;

const BIT_HANDLER_COUNT_PRE = 8;
const BIT_HANDLER_COUNT_PRE_SHIFT = 0;
const BIT_HANDLER_COUNT_PROCESS = 8;
const BIT_HANDLER_COUNT_PROCESS_SHIFT = BIT_HANDLER_COUNT_PRE + BIT_HANDLER_COUNT_PRE_SHIFT;
const BIT_HANDLER_COUNT_POST = 8;
const BIT_HANDLER_COUNT_POST_SHIFT = BIT_HANDLER_COUNT_PROCESS + BIT_HANDLER_COUNT_PROCESS_SHIFT;

export class Rule {

  ruleSlotIndexInput: BigNumberish;
  ruleSlotIndexOutput: BigNumberish;
  totalCount: BigNumberish;//contract use

  durationType: BigNumberish = 0;
  delayTimestamp: BigNumberish = 0;
  delayBlockNumber: BigNumberish = 0;

  handlerList: string[] = [];
  handlerArgsList: string[] = [];
  handlerCount: BigNumberish = 0;

  snippet: string = ZERO_ADDRESS;

  preHandlerList: string[] = [];
  preHandlerPoolList: string[] = [];
  preHandlerArgsList: string[] = [];

  processHandlerList: string[] = [];
  processHandlerPoolList: string[] = [];
  processHandlerArgsList: string[] = [];

  postHandlerList: string[] = [];
  postHandlerPoolList: string[] = [];
  postHandlerArgsList: string[] = [];

  state: RULE_STATE;

  constructor(ruleSlotIndexInput: BigNumberish, ruleSlotIndexOutput: BigNumberish, totalCount: BigNumberish = 0, durationType: BigNumberish = 0, delayTimestamp: BigNumberish = 0, delayBlockNumber: BigNumberish = 0) {
    this.durationType = durationType;
    this.ruleSlotIndexInput = ruleSlotIndexInput;
    this.ruleSlotIndexOutput = ruleSlotIndexOutput;

    this.totalCount = BN(totalCount);
    this.delayTimestamp = BN(delayTimestamp);
    this.delayBlockNumber = BN(delayBlockNumber);

    this.state = RULE_STATE.ENABLED;
  }


  public addPreHandler(preHandlerPool: string, preHandler: string, preHandlerArgs:any=[]) {
    this.preHandlerList.push(preHandler);
    this.preHandlerPoolList.push(preHandlerPool);
    this.preHandlerArgsList.push(Helper.rlp(preHandlerArgs));
  }

  //processHandlerArgs : [ ["percent","uint",1000],["sign","string","%"] ]
  public addProcessHandler(processHandlerPool: string, processHandler: string, processHandlerArgs: any= []) {
    this.processHandlerList.push(processHandler);
    this.processHandlerPoolList.push(processHandlerPool);
    this.processHandlerArgsList.push(Helper.rlp(processHandlerArgs));
  }

  public addPostHandler(postHandlerPool: string, postHandler: string, postHandlerArgs:any=[]) {
    this.postHandlerList.push(postHandler);
    this.postHandlerPoolList.push(postHandlerPool);
    this.postHandlerArgsList.push(Helper.rlp(postHandlerArgs));
  }

  public check() {
    if (this.ruleSlotIndexInput == this.ruleSlotIndexOutput) {
      throw Error("must ruleSlotIndexInput != ruleSlotIndexOutput");
    }
    if (SDK_CHECK) {
      if (this.processHandlerList.length == 0) {
        throw Error("processHandlerList can not be empty");
      }
    }
  }

  public init() {
    if (this.handlerList.length > 0) {
      return;
    }

    for (let i = 0; i < this.preHandlerList.length; ++i) {
      this.handlerList.push(this.preHandlerPoolList[i]);
      this.handlerList.push(this.preHandlerList[i]);
      if (this.preHandlerArgsList.length > 0) {
        this.handlerArgsList.push(this.preHandlerArgsList[i]);
      }
    }

    for (let i = 0; i < this.processHandlerList.length; ++i) {
      this.handlerList.push(this.processHandlerPoolList[i]);
      this.handlerList.push(this.processHandlerList[i]);
      if (this.processHandlerArgsList.length > 0) {
        this.handlerArgsList.push(this.processHandlerArgsList[i]);
      }
    }

    for (let i = 0; i < this.postHandlerList.length; ++i) {
      this.handlerList.push(this.postHandlerPoolList[i]);
      this.handlerList.push(this.postHandlerList[i]);
      if (this.postHandlerArgsList.length > 0) {
        this.handlerArgsList.push(this.postHandlerArgsList[i]);
      }
    }

    this.handlerCount = BN(this.handlerCount);
    this.handlerCount = Bit.bit(this.handlerCount, BN(this.preHandlerList.length), BIT_HANDLER_COUNT_PRE, BIT_HANDLER_COUNT_PRE_SHIFT);
    this.handlerCount = Bit.bit(this.handlerCount, BN(this.processHandlerList.length), BIT_HANDLER_COUNT_PROCESS, BIT_HANDLER_COUNT_PROCESS_SHIFT);
    this.handlerCount = Bit.bit(this.handlerCount, BN(this.postHandlerList.length), BIT_HANDLER_COUNT_POST, BIT_HANDLER_COUNT_POST_SHIFT);
  }
}
