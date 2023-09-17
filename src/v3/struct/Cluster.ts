// @ts-nocheck
import { BigNumberish } from "ethers";
import { CLUSTER_STATE } from "./Constant";
import { GroupSlot } from "./GroupSlot";
import { Rule } from "./Rule";
import { TokenSlot } from "./TokenSlot";
import { RuleSlot } from "./RuleSlot";
import { getLogger, ILogger } from "../util";

let log: ILogger = getLogger();

export class Cluster {
  clusterId: BigNumberish = 0; // get from chain ,this > 0

  contractMaxRuleSlotIndex: number = -1; // id to flag groupSlot[]

  deployerList: string[] = [];//first register usage
  adminList: string[] = [];//first register usage
  description: string;//first register usage

  groupSlotList: GroupSlot[] = [];//contract use
  ruleSlotBound: number[] = [];//contract use
  ruleList: Rule[] = [];//contract use
  attrList: [] = [];
  attrStateList: BigNumberish[] = [];

  handlerUniqueList: string[] = [];

  ruleSlotList: RuleSlot[] = [];//GroupSlot[][] = []; //memory use

  state: CLUSTER_STATE;//first register usage

  delayTimestamp: BigNumberish = 0;//first register usage
  delayBlockNumber: BigNumberish = 0;//first register usage

  constructor(deployer: string, admin: string, description: string, delayTimestamp: BigNumberish, delayBlockNumber: BigNumberish) {
    if(deployer)
      this.deployerList.push(deployer.toLowerCase());
    if(admin)
      this.adminList.push(admin.toLowerCase());
    this.description = description;
    this.delayTimestamp = delayTimestamp;
    this.delayBlockNumber = delayBlockNumber;
    this.state = CLUSTER_STATE.ENABLED;
  }


  public addRule(rule: Rule) {
    rule.check();
    this.ruleList.push(rule);
  }


  public addRuleSlot(ruleSlot: RuleSlot) {
    if (ruleSlot.ruleSlotIndex <= this.contractMaxRuleSlotIndex) {
      throw Error("must ruleSlotIndex > contractMaxRuleSlotIndex");
    }

    let groupSlotIndexMap = new Map();
    for (let i = 0; i < ruleSlot.groupSlotList.length; ++i) {
      let branch = ruleSlot.groupSlotList[i].branch;
      if (branch) {
        let exist = groupSlotIndexMap.get(branch);
        if (!exist) {
          groupSlotIndexMap.set(branch, true);
        } else {
          throw Error("ruleSlotIndex " + ruleSlot.ruleSlotIndex + " groupSlot branch " + branch + " repeated");
        }
      }
    }
    this.ruleSlotList.push(ruleSlot);
  }

  public async init() {
    log.debug("init cluster");
    //process ruleSlotList
    let ruleSlotIndexMap = new Map();
    let ruleSlotIndexArray = [];

    let ruleSlotList = [];
    for (let i = 0; i < this.ruleSlotList.length; ++i) {
      let ruleSlot = this.ruleSlotList[i];
      if (ruleSlot.ruleSlotIndex <= this.contractMaxRuleSlotIndex) {
        continue;
      }

      ruleSlotList.push(ruleSlot);

      let count = ruleSlotIndexMap.get(ruleSlot.ruleSlotIndex);
      if (count == undefined) {
        ruleSlotIndexMap.set(ruleSlot.ruleSlotIndex, 0);
        ruleSlotIndexArray.push(ruleSlot.ruleSlotIndex);
      } else {
        ruleSlotIndexMap.set(ruleSlot.ruleSlotIndex, count + 1);
        throw Error(ruleSlot.ruleSlotIndex + " ruleSlotIndex repeated!");
      }
    }

    if (ruleSlotIndexArray.length > 0) {
      ruleSlotIndexArray.sort(((a, b) => (a - b)));
      if (ruleSlotIndexArray[0] != this.contractMaxRuleSlotIndex + 1) {
        throw Error("ruleSlotIndex is not subsequent to the Contract rear ");
      }

      let span = ruleSlotIndexArray[ruleSlotIndexArray.length - 1] - ruleSlotIndexArray[0];
      if (span + 1 != ruleSlotIndexArray.length) {
        throw Error("ruleSlotList index not continuous");
      }
    }

    this.ruleSlotList = ruleSlotList;
    this.groupSlotList = [];
    this.ruleSlotBound = [];

    for (let n = 0; n < ruleSlotIndexArray.length; ++n) {
      let ruleSlotIndex = ruleSlotIndexArray[n];
      for (let i = 0; i < this.ruleSlotList.length; ++i) {
        let ruleSlot = this.ruleSlotList[i];
        if (ruleSlot.ruleSlotIndex == ruleSlotIndex) {
          this.groupSlotList.push(...ruleSlot.groupSlotList);

          let startBound = 0;
          if (this.ruleSlotBound.length > 0) {
            startBound = this.ruleSlotBound[this.ruleSlotBound.length - 1];
          }

          this.ruleSlotBound.push(startBound + ruleSlot.groupSlotList.length);
          break;
        }
      }
    }
    this.contractMaxRuleSlotIndex = this.contractMaxRuleSlotIndex + this.ruleSlotList.length;

    //init
    for (let i = 0; i < this.groupSlotList.length; ++i) {
      for (let j = 0; j < this.groupSlotList[i].tokenSlotList.length; ++j) {
        this.groupSlotList[i].tokenSlotList[j].bitEncode();
      }
    }

    let ruleList = [];
    for (let i = 0; i < this.ruleList.length; ++i) {
      let rule = this.ruleList[i];
      if (rule.fromContract != undefined && rule.fromContract) {
        continue;
      }
      this.ruleList[i].init();

      ruleList.push(rule);
    }
    this.ruleList = ruleList;
    //init unique handler

    for (let i = 0; i < this.ruleList.length; ++i) {
      let rule: Rule = this.ruleList[i];
      [{
        list: rule.preHandlerList,
        poolList: rule.preHandlerPoolList
      }, {
        list: rule.processHandlerList,
        poolList: rule.processHandlerPoolList
      }, {
        list: rule.postHandlerList,
        poolList: rule.postHandlerPoolList
      }].forEach(handler => {
        for (let i = 0; i < handler.list.length; ++i) {
          if (!this.handlerUniqueList.includes(handler.list[i])) {
            this.handlerUniqueList.push(handler.poolList[i]);
            this.handlerUniqueList.push(handler.list[i]);
          }
        }
      });
    }
  }



}
