// @ts-nocheck
import { BigNumberish } from "ethers";
import * as util from "../util/Util";
import {
  DURATION_TYPE,
  MINT_DESTROY_ADDRESS,
  RULE,
  RULE_IO_TYPE,
  SELF_ADDRESS,
  TOKEN_TEMPLATE_AMOUNT_REQUIRED,
  TOKEN_TEMPLATE_ID_REQUIRED
} from "./Constant";
import { TokenTemplate } from "./TokenTemplate";
import { Token } from "./Token";
import { Bit } from "../util";

let BN = util.Util.BN;

const BIT_TOKEN_SLOT_BRANCH = 8;
const BIT_TOKEN_SLOT_BRANCH_SHIFT = 0;
const BIT_TOKEN_SLOT_DURATION_TYPE = 8;
const BIT_TOKEN_SLOT_DURATION_TYPE_SHIFT = BIT_TOKEN_SLOT_BRANCH + BIT_TOKEN_SLOT_BRANCH_SHIFT;
const BIT_TOKEN_SLOT_DURATION_BEGIN = 32;
const BIT_TOKEN_SLOT_DURATION_BEGIN_SHIFT = BIT_TOKEN_SLOT_DURATION_TYPE + BIT_TOKEN_SLOT_DURATION_TYPE_SHIFT;
const BIT_TOKEN_SLOT_DURATION_END = 32;
const BIT_TOKEN_SLOT_DURATION_END_SHIFT = BIT_TOKEN_SLOT_DURATION_BEGIN + BIT_TOKEN_SLOT_DURATION_BEGIN_SHIFT;
const BIT_TOKEN_SLOT_IO_TYPE = 8;
const BIT_TOKEN_SLOT_IO_TYPE_SHIFT = BIT_TOKEN_SLOT_DURATION_END + BIT_TOKEN_SLOT_DURATION_END_SHIFT;
const BIT_TOKEN_SLOT_BUSINESS = 32;//this is for the central business of outside
const BIT_TOKEN_SLOT_BUSINESS_SHIFT = BIT_TOKEN_SLOT_IO_TYPE + BIT_TOKEN_SLOT_IO_TYPE_SHIFT;
const BIT_TOKEN_SLOT_MOUNTING_TOKEN_SLOT_INDEX = 8;
const BIT_TOKEN_SLOT_MOUNTING_TOKEN_SLOT_INDEX_SHIFT = BIT_TOKEN_SLOT_BUSINESS + BIT_TOKEN_SLOT_BUSINESS_SHIFT;
const BIT_TOKEN_SLOT_ALLOCATION_ID = 16;
const BIT_TOKEN_SLOT_ALLOCATION_ID_SHIFT = BIT_TOKEN_SLOT_ALLOCATION_ID + BIT_TOKEN_SLOT_MOUNTING_TOKEN_SLOT_INDEX_SHIFT;

export class TokenSlot {
  tokenTemplate: TokenTemplate;
  rule: RULE = RULE.ALL; // for inputUse 0 in input tokens , 1 out withdraw tokens

  ioAddressList: string[] = []; // input: receipt address; output: source address , 0x00 mint 0x12 user or contract address

  valueList: BigNumberish[] = [];

  branchList: BigNumberish[] = [];// input token branch , this is used for pairing output group branch
  durationTypeList: DURATION_TYPE[] = [];
  durationBeginList: BigNumberish[] = []; // can be timestamp or block
  durationEndList: BigNumberish[] = [];
  ioTypeList: BigNumberish[] = [];
  businessList: BigNumberish[] = [];
  mountingTokenSlotIndexList: BigNumberish[] = [];
  allocationIdList: BigNumberish[] = [];

  public constructor(tokenTemplate: TokenTemplate) {
    this.tokenTemplate = tokenTemplate;
    if (this.tokenTemplate)
      this.tokenTemplate.init();
  }



  public addBranch(ioAddress: string, durationType: DURATION_TYPE, branch: BigNumberish, ioType: BigNumberish = RULE_IO_TYPE.NONE) {
    let index = this.ioAddressList.length;
    // if (SDK_CHECK && this.branchList.length == 0 && BN(branch).gt(0)) {
    //   throw Error("ioAddress " + ioAddress + " first branch must be 0");
    // }

    if (ioType == RULE_IO_TYPE.POOL_TOKEN_MINT_DESTROY) {
      if (ioAddress == MINT_DESTROY_ADDRESS || ioAddress == SELF_ADDRESS) {
        throw Error("ioAddress " + ioAddress + " is error, ioType is RULE_IO_TYPE.POOL_TOKEN_MINT_DESTROY");
      }
    }

    for (let i = 0; i < this.branchList.length; ++i) {
      if (BN(this.branchList[i]).eq(BN(branch))) {
        throw Error("ioAddress " + ioAddress + " branch " + branch + " already exists");
      }
    }

    this.ioAddressList[index] = ioAddress;

    this.durationTypeList[index] = durationType;
    this.branchList[index] = branch;

    this.ioTypeList[index] = ioType;


    this.durationBeginList[index] = 0;
    this.durationEndList[index] = 0;

    this.businessList[index] = 0;
    this.mountingTokenSlotIndexList[index] = 0;
    this.allocationIdList[index] = 0;
  }

  public addBranchTimestamp(ioAddress: string, branch: BigNumberish, ioType?: BigNumberish = 0) {
    this.addBranch(ioAddress, DURATION_TYPE.TIMESTAMP, branch, ioType);
    return this;
  }

  public addBranchBlockNumber(ioAddress: string, branch: BigNumberish, ioType?: BigNumberish = 0) {
    this.addBranch(ioAddress, DURATION_TYPE.BLOCK_NUMBER, branch, ioType);
    return this;
  }

  public addDuration(durationBegin: BigNumberish, durationEnd: BigNumberish) {
    let index = this.ioAddressList.length - 1;

    this.durationBeginList[index] = durationBegin;
    this.durationEndList[index] = durationEnd;

    return this;
  }


  public addAllocationId(id: BigNumberish = 0) {
    let index = this.ioAddressList.length - 1;
    this.allocationIdList[index] = id;
    return this;
  }

  public bitEncode() {
    //todo require branch count;
    for (let i = 0; i < this.ioAddressList.length; ++i) {
      this.valueList[i] = BN(0);

      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.branchList[i]), BIT_TOKEN_SLOT_BRANCH, BIT_TOKEN_SLOT_BRANCH_SHIFT);
      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.durationTypeList[i]), BIT_TOKEN_SLOT_DURATION_TYPE, BIT_TOKEN_SLOT_DURATION_TYPE_SHIFT);
      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.durationBeginList[i]), BIT_TOKEN_SLOT_DURATION_BEGIN, BIT_TOKEN_SLOT_DURATION_BEGIN_SHIFT);
      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.durationEndList[i]), BIT_TOKEN_SLOT_DURATION_END, BIT_TOKEN_SLOT_DURATION_END_SHIFT);
      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.ioTypeList[i]), BIT_TOKEN_SLOT_IO_TYPE, BIT_TOKEN_SLOT_IO_TYPE_SHIFT);
      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.businessList[i]), BIT_TOKEN_SLOT_BUSINESS, BIT_TOKEN_SLOT_BUSINESS_SHIFT);
      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.mountingTokenSlotIndexList[i]), BIT_TOKEN_SLOT_MOUNTING_TOKEN_SLOT_INDEX, BIT_TOKEN_SLOT_MOUNTING_TOKEN_SLOT_INDEX_SHIFT);
      this.valueList[i] = Bit.bit(this.valueList[i], BN(this.allocationIdList[i]), BIT_TOKEN_SLOT_ALLOCATION_ID, BIT_TOKEN_SLOT_ALLOCATION_ID_SHIFT);

      this.valueList[i] = BN(this.valueList[i]);
    }
  }

  public async bitDecode() {
    for (let i = 0; i < this.ioAddressList.length; ++i) {
      this.branchList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_BRANCH, BIT_TOKEN_SLOT_BRANCH_SHIFT);
      this.durationTypeList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_DURATION_TYPE, BIT_TOKEN_SLOT_DURATION_TYPE_SHIFT);
      this.durationBeginList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_DURATION_BEGIN, BIT_TOKEN_SLOT_DURATION_BEGIN_SHIFT);
      this.durationEndList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_DURATION_END, BIT_TOKEN_SLOT_DURATION_END_SHIFT);
      this.ioTypeList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_IO_TYPE, BIT_TOKEN_SLOT_IO_TYPE_SHIFT);
      this.businessList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_BUSINESS, BIT_TOKEN_SLOT_BUSINESS_SHIFT);
      this.mountingTokenSlotIndexList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_MOUNTING_TOKEN_SLOT_INDEX, BIT_TOKEN_SLOT_MOUNTING_TOKEN_SLOT_INDEX_SHIFT);
      this.allocationIdList[i] = await Bit.bitValue(this.valueList[i], BIT_TOKEN_SLOT_ALLOCATION_ID, BIT_TOKEN_SLOT_ALLOCATION_ID_SHIFT);
    }
  }


}
