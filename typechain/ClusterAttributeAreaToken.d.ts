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

interface ClusterAttributeAreaTokenInterface extends ethers.utils.Interface {
  functions: {
    "cname()": FunctionFragment;
    "getClusterTokenAttrIdList(uint32,address,uint256)": FunctionFragment;
    "getClusterTokenAttrOpt(uint32,address,uint256,uint32,uint32)": FunctionFragment;
    "getClusterTokenSubAttrIdList(uint32,address,uint256,uint32)": FunctionFragment;
    "initialize(address,address,address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "tokenAttributeAmount(bytes32)": FunctionFragment;
    "tokenAttributeAmountMax(bytes32)": FunctionFragment;
    "tokenAttributeAmountMin(bytes32)": FunctionFragment;
    "tokenAttributeIdList(bytes32,uint256)": FunctionFragment;
    "tokenAttributeState(bytes32)": FunctionFragment;
    "tokenAttributeText(bytes32)": FunctionFragment;
    "tokenAttributeType(bytes32)": FunctionFragment;
    "tokenSubAttributeIdList(bytes32,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
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
    functionFragment: "initialize",
    values: [string, string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAttributeAmount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAttributeAmountMax",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAttributeAmountMin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAttributeIdList",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAttributeState",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAttributeText",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAttributeType",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSubAttributeIdList",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
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
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAttributeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAttributeAmountMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAttributeAmountMin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAttributeIdList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAttributeState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAttributeText",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAttributeType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenSubAttributeIdList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
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
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "SetClusterAttr(uint32,uint32)": EventFragment;
    "SetTokenAttr(address,uint32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetClusterAttr"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetTokenAttr"): EventFragment;
}

export type InitializedEvent = TypedEvent<[number] & { version: number }>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type SetClusterAttrEvent = TypedEvent<
  [number, number] & { clusterId: number; attrId: number }
>;

export type SetTokenAttrEvent = TypedEvent<
  [string, number] & { token: string; attrId: number }
>;

export class ClusterAttributeAreaToken extends BaseContract {
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

  interface: ClusterAttributeAreaTokenInterface;

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

    initialize(
      clusterArea_: string,
      poolContract_: string,
      engine_: string,
      clusterAttributeArea_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenAttributeAmount(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[number]>;

    tokenAttributeAmountMax(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[number]>;

    tokenAttributeAmountMin(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[number]>;

    tokenAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    tokenAttributeState(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[number]>;

    tokenAttributeText(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenAttributeType(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[number]>;

    tokenSubAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateTokenIdOptAttrList(
      caller: string,
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

  initialize(
    clusterArea_: string,
    poolContract_: string,
    engine_: string,
    clusterAttributeArea_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenAttributeAmount(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<number>;

  tokenAttributeAmountMax(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<number>;

  tokenAttributeAmountMin(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<number>;

  tokenAttributeIdList(
    arg0: BytesLike,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  tokenAttributeState(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<number>;

  tokenAttributeText(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenAttributeType(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<number>;

  tokenSubAttributeIdList(
    arg0: BytesLike,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateTokenIdOptAttrList(
    caller: string,
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

    initialize(
      clusterArea_: string,
      poolContract_: string,
      engine_: string,
      clusterAttributeArea_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    tokenAttributeAmount(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<number>;

    tokenAttributeAmountMax(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<number>;

    tokenAttributeAmountMin(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<number>;

    tokenAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    tokenAttributeState(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<number>;

    tokenAttributeText(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenAttributeType(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<number>;

    tokenSubAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

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
      },
      overrides?: CallOverrides
    ): Promise<void>;

    updateTokenIdOptAttrList(
      caller: string,
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
      },
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Initialized(uint8)"(
      version?: null
    ): TypedEventFilter<[number], { version: number }>;

    Initialized(
      version?: null
    ): TypedEventFilter<[number], { version: number }>;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

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

    initialize(
      clusterArea_: string,
      poolContract_: string,
      engine_: string,
      clusterAttributeArea_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenAttributeAmount(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAttributeAmountMax(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAttributeAmountMin(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAttributeState(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAttributeText(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAttributeType(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenSubAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
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
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateTokenIdOptAttrList(
      caller: string,
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

    initialize(
      clusterArea_: string,
      poolContract_: string,
      engine_: string,
      clusterAttributeArea_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenAttributeAmount(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenAttributeAmountMax(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenAttributeAmountMin(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenAttributeState(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenAttributeText(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenAttributeType(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenSubAttributeIdList(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
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
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateTokenIdOptAttrList(
      caller: string,
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
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
