/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IClusterAttributeAreaTokenInterface extends ethers.utils.Interface {
  functions: {
    "cname()": FunctionFragment;
    "getClusterTokenAttrIdList(uint32,address,uint256)": FunctionFragment;
    "getClusterTokenAttrOpt(uint32,address,uint256,uint32,uint32)": FunctionFragment;
    "getClusterTokenSubAttrIdList(uint32,address,uint256,uint32)": FunctionFragment;
    "updateClusterTokenIdAttrList(uint32,tuple[])": FunctionFragment;
    "updateClusterTokenIdOptAttrList(address,uint32,(address,uint8,uint256,tuple[]))": FunctionFragment;
    "updateTokenIdOptAttrList(address,(address,uint8,uint256,tuple[]))": FunctionFragment;
    "version()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "cname", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getClusterTokenAttrIdList",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getClusterTokenAttrOpt",
    values: [BigNumberish, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getClusterTokenSubAttrIdList",
    values: [BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateClusterTokenIdAttrList",
    values: [
      BigNumberish,
      {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      }[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateClusterTokenIdOptAttrList",
    values: [
      string,
      BigNumberish,
      {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTokenIdOptAttrList",
    values: [
      string,
      {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "cname", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getClusterTokenAttrIdList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getClusterTokenAttrOpt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getClusterTokenSubAttrIdList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateClusterTokenIdAttrList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateClusterTokenIdOptAttrList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTokenIdOptAttrList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "SetClusterAttr(uint32,uint32)": EventFragment;
    "SetTokenAttr(address,uint32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetClusterAttr"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetTokenAttr"): EventFragment;
}

export type SetClusterAttrEvent = TypedEvent<
  [number, number] & { clusterId: number; attrId: number }
>;

export type SetTokenAttrEvent = TypedEvent<
  [string, number] & { token: string; attrId: number }
>;

export class IClusterAttributeAreaToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IClusterAttributeAreaTokenInterface;

  functions: {
    cname(overrides?: CallOverrides): Promise<[string]>;

    getClusterTokenAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number[]]>;

    getClusterTokenAttrOpt(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      parentAttrId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          number,
          number,
          number,
          number,
          number,
          number,
          string,
          number,
          number,
          string
        ] & {
          attrId: number;
          attrOpt: number;
          attrType: number;
          attrAmount: number;
          attrAmountMin: number;
          attrAmountMax: number;
          attrText: string;
          parentAttrId: number;
          attrState: number;
          attrFormula: string;
        }
      ]
    >;

    getClusterTokenSubAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number[]]>;

    updateClusterTokenIdAttrList(
      clusterId: BigNumberish,
      tokenAttrList: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateClusterTokenIdOptAttrList(
      caller: string,
      clusterId: BigNumberish,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateTokenIdOptAttrList(
      caller: string,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  cname(overrides?: CallOverrides): Promise<string>;

  getClusterTokenAttrIdList(
    clusterId: BigNumberish,
    token: string,
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number[]>;

  getClusterTokenAttrOpt(
    clusterId: BigNumberish,
    token: string,
    tokenId: BigNumberish,
    parentAttrId: BigNumberish,
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      number,
      number,
      number,
      number,
      number,
      number,
      string,
      number,
      number,
      string
    ] & {
      attrId: number;
      attrOpt: number;
      attrType: number;
      attrAmount: number;
      attrAmountMin: number;
      attrAmountMax: number;
      attrText: string;
      parentAttrId: number;
      attrState: number;
      attrFormula: string;
    }
  >;

  getClusterTokenSubAttrIdList(
    clusterId: BigNumberish,
    token: string,
    tokenId: BigNumberish,
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number[]>;

  updateClusterTokenIdAttrList(
    clusterId: BigNumberish,
    tokenAttrList: {
      token: string;
      erc: BigNumberish;
      tokenId: BigNumberish;
      attributeOptList: {
        attrId: BigNumberish;
        attrOpt: BigNumberish;
        attrType: BigNumberish;
        attrAmount: BigNumberish;
        attrText: string;
        parentAttrId: BigNumberish;
        attrState: BigNumberish;
        attrFormula: BytesLike;
      }[];
    }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateClusterTokenIdOptAttrList(
    caller: string,
    clusterId: BigNumberish,
    tokenOptAttr: {
      token: string;
      erc: BigNumberish;
      tokenId: BigNumberish;
      attributeOptList: {
        attrId: BigNumberish;
        attrOpt: BigNumberish;
        attrType: BigNumberish;
        attrAmount: BigNumberish;
        attrText: string;
        parentAttrId: BigNumberish;
        attrState: BigNumberish;
        attrFormula: BytesLike;
      }[];
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateTokenIdOptAttrList(
    caller: string,
    tokenOptAttr: {
      token: string;
      erc: BigNumberish;
      tokenId: BigNumberish;
      attributeOptList: {
        attrId: BigNumberish;
        attrOpt: BigNumberish;
        attrType: BigNumberish;
        attrAmount: BigNumberish;
        attrText: string;
        parentAttrId: BigNumberish;
        attrState: BigNumberish;
        attrFormula: BytesLike;
      }[];
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    cname(overrides?: CallOverrides): Promise<string>;

    getClusterTokenAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number[]>;

    getClusterTokenAttrOpt(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      parentAttrId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        number,
        number,
        number,
        number,
        number,
        string,
        number,
        number,
        string
      ] & {
        attrId: number;
        attrOpt: number;
        attrType: number;
        attrAmount: number;
        attrAmountMin: number;
        attrAmountMax: number;
        attrText: string;
        parentAttrId: number;
        attrState: number;
        attrFormula: string;
      }
    >;

    getClusterTokenSubAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number[]>;

    updateClusterTokenIdAttrList(
      clusterId: BigNumberish,
      tokenAttrList: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    updateClusterTokenIdOptAttrList(
      caller: string,
      clusterId: BigNumberish,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: CallOverrides
    ): Promise<void>;

    updateTokenIdOptAttrList(
      caller: string,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "SetClusterAttr(uint32,uint32)"(
      clusterId?: null,
      attrId?: null
    ): TypedEventFilter<
      [number, number],
      { clusterId: number; attrId: number }
    >;

    SetClusterAttr(
      clusterId?: null,
      attrId?: null
    ): TypedEventFilter<
      [number, number],
      { clusterId: number; attrId: number }
    >;

    "SetTokenAttr(address,uint32)"(
      token?: null,
      attrId?: null
    ): TypedEventFilter<[string, number], { token: string; attrId: number }>;

    SetTokenAttr(
      token?: null,
      attrId?: null
    ): TypedEventFilter<[string, number], { token: string; attrId: number }>;
  };

  estimateGas: {
    cname(overrides?: CallOverrides): Promise<BigNumber>;

    getClusterTokenAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getClusterTokenAttrOpt(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      parentAttrId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getClusterTokenSubAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateClusterTokenIdAttrList(
      clusterId: BigNumberish,
      tokenAttrList: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateClusterTokenIdOptAttrList(
      caller: string,
      clusterId: BigNumberish,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateTokenIdOptAttrList(
      caller: string,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cname(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getClusterTokenAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getClusterTokenAttrOpt(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      parentAttrId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getClusterTokenSubAttrIdList(
      clusterId: BigNumberish,
      token: string,
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateClusterTokenIdAttrList(
      clusterId: BigNumberish,
      tokenAttrList: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateClusterTokenIdOptAttrList(
      caller: string,
      clusterId: BigNumberish,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateTokenIdOptAttrList(
      caller: string,
      tokenOptAttr: {
        token: string;
        erc: BigNumberish;
        tokenId: BigNumberish;
        attributeOptList: {
          attrId: BigNumberish;
          attrOpt: BigNumberish;
          attrType: BigNumberish;
          attrAmount: BigNumberish;
          attrText: string;
          parentAttrId: BigNumberish;
          attrState: BigNumberish;
          attrFormula: BytesLike;
        }[];
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
