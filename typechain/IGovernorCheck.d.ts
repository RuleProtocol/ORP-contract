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

interface IGovernorCheckInterface extends ethers.utils.Interface {
  functions: {
    "check(tuple[],(address,address,uint32,uint16,uint16,uint8))": FunctionFragment;
    "getSucceedParams((address,address,uint32,uint16,uint16,uint8),uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "check",
    values: [
      {
        erc: BigNumberish;
        token: string;
        id: BigNumberish;
        amount: BigNumberish;
        attrInList: { attrId: BigNumberish; attrAmount: BigNumberish }[];
      }[],
      {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getSucceedParams",
    values: [
      {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(functionFragment: "check", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSucceedParams",
    data: BytesLike
  ): Result;

  events: {};
}

export class IGovernorCheck extends BaseContract {
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

  interface: IGovernorCheckInterface;

  functions: {
    check(
      inTokenList: {
        erc: BigNumberish;
        token: string;
        id: BigNumberish;
        amount: BigNumberish;
        attrInList: { attrId: BigNumberish; attrAmount: BigNumberish }[];
      }[],
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getSucceedParams(
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      voteMode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number, number]>;
  };

  check(
    inTokenList: {
      erc: BigNumberish;
      token: string;
      id: BigNumberish;
      amount: BigNumberish;
      attrInList: { attrId: BigNumberish; attrAmount: BigNumberish }[];
    }[],
    governorCheckData: {
      caller: string;
      clusterRuleAreaAddress: string;
      clusterId: BigNumberish;
      ruleSlotIndexInput: BigNumberish;
      ruleSlotIndexOutput: BigNumberish;
      groupInputBranch: BigNumberish;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getSucceedParams(
    governorCheckData: {
      caller: string;
      clusterRuleAreaAddress: string;
      clusterId: BigNumberish;
      ruleSlotIndexInput: BigNumberish;
      ruleSlotIndexOutput: BigNumberish;
      groupInputBranch: BigNumberish;
    },
    voteMode: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[number, number]>;

  callStatic: {
    check(
      inTokenList: {
        erc: BigNumberish;
        token: string;
        id: BigNumberish;
        amount: BigNumberish;
        attrInList: { attrId: BigNumberish; attrAmount: BigNumberish }[];
      }[],
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    getSucceedParams(
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      voteMode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number, number]>;
  };

  filters: {};

  estimateGas: {
    check(
      inTokenList: {
        erc: BigNumberish;
        token: string;
        id: BigNumberish;
        amount: BigNumberish;
        attrInList: { attrId: BigNumberish; attrAmount: BigNumberish }[];
      }[],
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getSucceedParams(
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      voteMode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    check(
      inTokenList: {
        erc: BigNumberish;
        token: string;
        id: BigNumberish;
        amount: BigNumberish;
        attrInList: { attrId: BigNumberish; attrAmount: BigNumberish }[];
      }[],
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getSucceedParams(
      governorCheckData: {
        caller: string;
        clusterRuleAreaAddress: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        groupInputBranch: BigNumberish;
      },
      voteMode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
