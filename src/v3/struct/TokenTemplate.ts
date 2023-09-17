// @ts-nocheck
import { BigNumber, BigNumberish, BytesLike, ethers } from "ethers";

import {
  ERC,
  MINT_DESTROY_ADDRESS,
  SDK_CHECK,
  TOKEN_TEMPLATE_AMOUNT_FORMULA_REQUIRED,
  TOKEN_TEMPLATE_AMOUNT_REQUIRED,
  TOKEN_TEMPLATE_AMOUNT_REQUIRED as TTAR,
  TOKEN_TEMPLATE_ATTRIBUTE_REQUIRED,
  TOKEN_TEMPLATE_ID_FORMULA_REQUIRED,
  TOKEN_TEMPLATE_ID_REQUIRED,
  TOKEN_TEMPLATE_ID_REQUIRED as TTIR,
  TOKEN_TEMPLATE_OUT_ADDRESS_REQUIRED,
  TOKEN_TEMPLATE_TYPE,
  ZERO_ADDRESS
} from "./Constant";
import { Bit, getLogger, ILogger } from "../util";
import * as util from "../util/Util";
let BN = util.Util.BN;
let D18 = util.Util.D18;
let log: ILogger = getLogger();

const BIT_TOKEN_TEMPLATE_TYPE = 4;
const BIT_TOKEN_TEMPLATE_TYPE_SHIFT = 0;
const BIT_TOKEN_TEMPLATE_ID_REQUIRED = 4;
const BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT = BIT_TOKEN_TEMPLATE_TYPE + BIT_TOKEN_TEMPLATE_TYPE_SHIFT;
const BIT_TOKEN_TEMPLATE_ID_COUNT = 16;
const BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT = BIT_TOKEN_TEMPLATE_ID_REQUIRED + BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT;
const BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED = 2;
const BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED_SHIFT = BIT_TOKEN_TEMPLATE_ID_COUNT + BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT;
const BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED = 4;
const BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT = BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED + BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED_SHIFT;
const BIT_TOKEN_TEMPLATE_AMOUNT_COUNT = 2;
const BIT_TOKEN_TEMPLATE_AMOUNT_COUNT_SHIFT = BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED + BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT;

export class TokenTemplate {
  erc: ERC; // coin 0 erc20 1 erc721 2 erc1155 3
  token: string;
  valueList: BigNumberish[] = [];

  idIndex: BigNumberish = BN(0);
  id: BigNumberish = 0; //begin id or specific id
  idEnd: BigNumberish = 0;
  idList: BigNumberish[] = [];
  amount: BigNumberish = 0; // begin amount or specific amount
  amountEnd: BigNumberish = 0;

  idType: BigNumberish = 0;
  idRequired: BigNumberish = TOKEN_TEMPLATE_ID_REQUIRED.EXIST;
  amountRequired: BigNumberish = TOKEN_TEMPLATE_AMOUNT_REQUIRED.EXIST;


  constructor(erc: number, token: string) {
    this.erc = erc;
    this.token = token;
  }

  init() {
    this.valueList = [];
    if (this.erc == ERC.ERC20 || this.erc == ERC.COIN) {
      this.valueList.push(BN(0));//Type
      this.valueList.push(this.amount);
      this.valueList.push(this.amountEnd);
      this.setAmountRequired(this.amountRequired);

    } else if (this.erc == ERC.ERC1155) {
      this.valueList.push(BN(0));//type
      this.valueList.push(BN(0));//idIndex
      if (this.idList.length > 0) {
        this.setType(TOKEN_TEMPLATE_TYPE.ID_LIST);
        this.setIdRequired(this.idRequired);
        this.setAmountRequired(this.amountRequired);

        this.valueList.push(this.amount);
        this.valueList.push(this.amountEnd);
        this.valueList.push(...this.idList);

        this.setIdCount(this.idList.length);
      } else {
        this.setType(TOKEN_TEMPLATE_TYPE.ID_RANGE);
        this.setIdRequired(this.idRequired);
        this.setAmountRequired(this.amountRequired);

        this.valueList.push(this.amount);
        this.valueList.push(this.amountEnd);
        this.valueList.push(this.id);
        this.valueList.push(this.idEnd);
        this.setIdCount(2);
      }

    } else if (this.erc == ERC.ERC721) {
      this.valueList.push(BN(0));//type
      this.valueList.push(BN(0));//idIndex
      this.setIdRequired(this.idRequired);
      if (this.idList.length > 0) {
        this.setType(TOKEN_TEMPLATE_TYPE.ID_LIST);
        this.valueList.push(...this.idList);
        this.setIdCount(this.idList.length);
      } else {
        this.setType(TOKEN_TEMPLATE_TYPE.ID_RANGE);
        this.valueList.push(this.id);
        this.valueList.push(this.idEnd);
        this.setIdCount(2);
      }


      //TRUE,FALSE,EXIST,NONE all checked
      if (this.amountRequired) {
        this.setAmountRequired(this.amountRequired);
        this.valueList.push(this.amount);
        this.valueList.push(this.amountEnd);
        this.setAmountCount(2);
      }

    }


    if (this.erc == ERC.ERC721 || this.erc == ERC.ERC1155) {
      let attrExistCheck = false;
    } else if (this.erc != ERC.NONE) {
      log.info(`TokenTemplate token ${this.token} has no ERC`);
    }

    return this;
  }

  public static new() {
    let tokenTemplate = new TokenTemplate(ERC.ERC20, MINT_DESTROY_ADDRESS);
    tokenTemplate.amount = 1;
    tokenTemplate.amountEnd = 1;
    return tokenTemplate;
  }

  public static newCoin(amount: BigNumber, amountEnd: BigNumber) {
    if (SDK_CHECK && BN(amount).gt(BN(amountEnd))) {
      throw Error("Coin must amount < amountEnd");
    }
    let tokenTemplate = new TokenTemplate(ERC.COIN, chainHub.Util.ZeroAddress());
    tokenTemplate.amount = amount;
    tokenTemplate.amountEnd = amountEnd;
    return tokenTemplate;
  }

  public static newERC20(token: string, amount: BigNumber, amountEnd: BigNumber) {
    if (SDK_CHECK && BN(amount).gt(BN(amountEnd))) {
      throw Error("ERC20 must amount < amountEnd");
    }
    let tokenTemplate = new TokenTemplate(ERC.ERC20, token);
    tokenTemplate.amount = amount;
    tokenTemplate.amountEnd = amountEnd;
    return tokenTemplate;
  }

  //output
  //must id = 0 , idEnd = 0 : mint incrementally
  //must id > 0 idEnd > id : claim accordingly
  //input
  //id = 0 , idEnd = 0
  public static newERC721Range(token: string, id: BigNumber, idEnd: BigNumber) {
    if (SDK_CHECK && BN(id).gt(BN(idEnd))) {
      throw Error("ERC721 range must id < idEnd");
    }
    let tokenTemplate = new TokenTemplate(ERC.ERC721, token);
    tokenTemplate.id = id;
    tokenTemplate.idEnd = idEnd;
    return tokenTemplate;
  }

  public static newERC721List(token: string, idList: BigNumberish[]) {
    if (SDK_CHECK && idList.length == 0) {
      throw Error("ERC721 list must idList.length > 0");
    }
    let tokenTemplate = new TokenTemplate(ERC.ERC721, token);
    tokenTemplate.idList = idList.sort();
    return tokenTemplate;
  }

  //mustn't id = 0 idEnd = 0, coz 1155 has no mint
  //must id > 0 , idEnd > id
  public static newERC1155Range(token: string, id: BigNumber, idEnd: BigNumber, amount: BigNumber, amountEnd: BigNumber) {
    if (SDK_CHECK && BN(id).gt(BN(idEnd))) {
      throw Error("ERC1155 range must id < idEnd");
    }
    if (SDK_CHECK && BN(amount).gt(BN(amountEnd))) {
      throw Error("ERC1155 range must amount < amountEnd");
    }

    let tokenTemplate = new TokenTemplate(ERC.ERC1155, token);
    tokenTemplate.id = id;
    tokenTemplate.idEnd = idEnd;
    tokenTemplate.amount = amount;
    tokenTemplate.amountEnd = amountEnd;

    return tokenTemplate;
  }

  public static newERC1155List(token: string, idList: BigNumberish[], amount: BigNumber, amountEnd: BigNumber) {
    if (SDK_CHECK && idList.length == 0) {
      throw Error("ERC1155 list must idList.length > 0");
    }
    if (SDK_CHECK && BN(amount).gt(BN(amountEnd))) {
      throw Error("ERC1155 list must amount < amountEnd");
    }

    let tokenTemplate = new TokenTemplate(ERC.ERC1155, token);
    tokenTemplate.idList = idList.sort();
    tokenTemplate.amount = amount;
    tokenTemplate.amountEnd = amountEnd;
    return tokenTemplate;
  }

  public addIdRequired(idRequired: BigNumberish = TTIR.TRUE) {
    this.idRequired = idRequired;
    return this;
  }

  public addIdAmountRequired(idRequired: BigNumberish = TTIR.TRUE, amountRequired: BigNumberish = TTAR.TRUE) {
    this.idRequired = idRequired;
    this.amountRequired = amountRequired;

    if (this.erc == ERC.ERC1155 && idRequired != amountRequired) {
      throw Error("ERC1155 list must idRequired = amountRequired");
    }

    return this;
  }


  public addERC721RangeAmount(amount: BigNumber, amountEnd: BigNumber) {
    this.amount = amount;
    this.amountEnd = amountEnd;
    return this;
  }

  public addAmountRequired(amountRequired: BigNumberish) {
    this.amountRequired = BN(amountRequired);
    return this;
  }



  //0 all
  //1 token
  //2 erc + id + amount
  public desc(type? = 0) {
    let tokenDesc: string = "";
    if (this.erc == ERC.COIN) {
      if (type == 0 || type == 2) {
        tokenDesc += "Coin-*amt[" + D18(this.amount) + "," + D18(this.amountEnd) + "]";
      }
    } else if (this.erc == ERC.ERC20) {
      if (type == 0 || type == 1) {
        tokenDesc += this.token + " ";
      }
      if (type == 0 || type == 2) {
        tokenDesc += "ERC20-*amt[" + D18(this.amount) + "," + D18(this.amountEnd) + "]";
      }
    } else if (this.erc == ERC.ERC1155 || this.erc == ERC.ERC721) {
      if (type == 0 || type == 1) {
        tokenDesc += this.token + " ";
      }
      if (type == 0 || type == 2) {
        let name = this.erc == ERC.ERC1155 ? "ERC1155" : "ERC721";
        tokenDesc += name;
        if (this.erc == ERC.ERC1155) {
          tokenDesc += "-#-amt[" + D18(this.amount) + "," + D18(this.amountEnd) + "]";
        } else if (this.erc == ERC.ERC721) {
          tokenDesc += "-#-amt[" + this.amount + "," + this.amountEnd + "]";
        }

        if (BN(this.idEnd).gt(0)) {
          tokenDesc += "-idRange-[" + this.id + "," + this.idEnd + "]-idIndex-" + this.idIndex;
        } else {
          if (this.idList.length > 0) {
            tokenDesc += "-idList-[";
            for (let i = 0; i < this.idList.length; ++i) {
              tokenDesc += this.idList[i] + ",";
            }
            tokenDesc = tokenDesc.substring(0, tokenDesc.length - 1);
            tokenDesc += "]";
          }
          tokenDesc += "-idIndex-" + this.idIndex;
        }
      }
    }
    return tokenDesc;
  }


  public getAmountRange() {
    let amountRange: [] = [];
    if (this.erc == ERC.COIN || this.erc == ERC.ERC20) {
      amountRange[0] = this.valueList[1];
      amountRange[1] = this.valueList[2];
    } else if (this.erc == ERC.ERC1155) { //ERC1155
      amountRange[0] = this.valueList[2];
      amountRange[1] = this.valueList[3];
    } else if (this.erc == ERC.ERC721) {
      let idCount = this.getIdCount();
      let idFormulaRequired = this.getIdFormulaRequired();
      let amountRequired = this.getAmountRequired();
      if (amountRequired != TOKEN_TEMPLATE_AMOUNT_REQUIRED.FALSE) {
        amountRange[0] = this.valueList[2 + idCount + idFormulaRequired];
        amountRange[1] = this.valueList[3 + idCount + idFormulaRequired];
      }
    }
    return amountRange;
  }

  public setAmountRange(amountRange: []) {
    if (this.erc == ERC.COIN || this.erc == ERC.ERC20) {
      this.valueList[0] = amountRange[0];
      this.valueList[1] = amountRange[1];
    } else if (this.erc == ERC.ERC1155) { //ERC1155
      this.valueList[2] = amountRange[0];
      this.valueList[3] = amountRange[1];
    } else if (this.erc == ERC.ERC721) {
      let idCount = this.getIdCount();
      let idFormulaRequired = this.getIdFormulaRequired();
      this.valueList[2 + idCount + idFormulaRequired] = amountRange[0];
      this.valueList[3 + idCount + idFormulaRequired] = amountRange[1];
    }
  }

  public getIdRange(): [] {
    let idRange: [] = [];
    if (this.erc == ERC.ERC721) {
      let templateType = this.getType();
      if (templateType == TOKEN_TEMPLATE_TYPE.ID_RANGE) {
        idRange[0] = this.valueList[2];
        idRange[1] = this.valueList[3];
      }
    } else if (this.erc == ERC.ERC1155) {
      let templateType = this.getType();
      if (templateType == TOKEN_TEMPLATE_TYPE.ID_RANGE) {
        idRange[0] = this.valueList[4];
        idRange[1] = this.valueList[5];
      }
    }
    return idRange;
  }

  public getIdList(): [] {
    if (this.erc == ERC.COIN || this.erc == ERC.ERC20) {
      return [];
    } else if (this.erc == ERC.ERC721) {
      let templateType = this.getType();
      if (templateType == TOKEN_TEMPLATE_TYPE.ID_LIST) {
        let idCount = this.getIdCount();
        let idList: [] = [];
        for (let i = 0; i < idCount; i++)
          idList[i] = this.valueList[i + 2];
        return idList;
      }
    } else if (this.erc == ERC.ERC1155) {
      let templateType = this.getType();
      if (templateType == TOKEN_TEMPLATE_TYPE.ID_LIST) {
        let idCount = this.getIdCount();
        let idList: [] = [];
        for (let i = 0; i < idCount; i++)
          idList[i] = this.valueList[i + 4];
        return idList;
      }
    }

    return [];
  }

  public getIdListLength() {
    if (this.erc == ERC.COIN || this.erc == ERC.ERC20) {
      return 0;
    } else if (this.erc == ERC.ERC721 || this.erc == ERC.ERC1155) {
      let templateType = this.getType();
      if (templateType == TOKEN_TEMPLATE_TYPE.ID_LIST) {
        return this.getIdCount();
      }
      return 0;
    }
    return 0;
  }

  public getId(index: BigNumberish) {
    if (this.erc == ERC.COIN || this.erc == ERC.ERC20) {
      return 0;
    } else if (this.erc == ERC.ERC721) {
      let templateType = this.getType();
      if (templateType == TOKEN_TEMPLATE_TYPE.ID_LIST) {
        let idCount = this.getIdCount();
        if (index < idCount)
          return this.valueList[index + 2];
      }
    } else if (this.erc == ERC.ERC1155) {
      let templateType = this.getType();
      if (templateType == TOKEN_TEMPLATE_TYPE.ID_LIST) {
        let idCount = this.getIdCount();
        if (index < idCount)
          return this.valueList[index + 4];
      }
    }
    return 0;
  }


  public setType(templateType: BigNumberish) {
    this.valueList[0] = Bit.bit(this.valueList[0], templateType, BIT_TOKEN_TEMPLATE_TYPE, BIT_TOKEN_TEMPLATE_TYPE_SHIFT);
  }

  public getType() {
    return Number(Bit.bitValue(this.valueList[0], BIT_TOKEN_TEMPLATE_TYPE, BIT_TOKEN_TEMPLATE_TYPE_SHIFT));
  }

  public setIdRequired(idRequired: BigNumberish) {
    this.valueList[0] = Bit.bit(this.valueList[0], idRequired, BIT_TOKEN_TEMPLATE_ID_REQUIRED, BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT);
  }

  public getIdRequired() {
    return Number(Bit.bitValue(this.valueList[0], BIT_TOKEN_TEMPLATE_ID_REQUIRED, BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT));
  }

  public setIdCount(idCount: BigNumberish) {
    if (this.erc == ERC.ERC721 || this.erc == ERC.ERC1155) {
      this.valueList[0] = Bit.bit(this.valueList[0], idCount, BIT_TOKEN_TEMPLATE_ID_COUNT, BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT);
    }
  }

  public getIdCount() {
    if (this.erc == ERC.ERC721 || this.erc == ERC.ERC1155) {
      return Number(Bit.bitValue(this.valueList[0], BIT_TOKEN_TEMPLATE_ID_COUNT, BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT));
    }
    return 0;
  }


  public setAmountRequired(amountRequired: BigNumberish) {
    this.valueList[0] = Bit.bit(this.valueList[0], amountRequired, BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED, BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT);
  }

  public getAmountRequired() {
    return Number(Bit.bitValue(this.valueList[0], BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED, BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT));
  }

  public setAmountCount(amountCount: BigNumberish) {
    if (this.erc == ERC.ERC721 || this.erc == ERC.ERC1155) {
      this.valueList[0] = Bit.bit(this.valueList[0], amountCount, BIT_TOKEN_TEMPLATE_AMOUNT_COUNT, BIT_TOKEN_TEMPLATE_AMOUNT_COUNT_SHIFT);
    }
  }

  public getAmountCount() {
    if (this.erc == ERC.ERC721) {
      return Number(Bit.bitValue(this.valueList[0], BIT_TOKEN_TEMPLATE_AMOUNT_COUNT, BIT_TOKEN_TEMPLATE_AMOUNT_COUNT_SHIFT));
    }
    return 2;
  }






}
