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

interface IHandlerInterface extends ethers.utils.Interface {
  functions: {
    "cname()": FunctionFragment;
    "getRuleGroupSlotArgs(uint32,uint16,uint8)": FunctionFragment;
    "getState((address,address,uint32,uint16,uint16,uint8,address,uint32,address,uint8,bytes))": FunctionFragment;
    "regRuleGroupSlotArgs(uint32,uint16,uint8,bytes)": FunctionFragment;
    "version()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "cname", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRuleGroupSlotArgs",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getState",
    values: [
      {
        engine: string;
        clusterArea: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        branch: BigNumberish;
        stateCounter: string;
        taskId: BigNumberish;
        caller: string;
        cmd: BigNumberish;
        args: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "regRuleGroupSlotArgs",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "cname", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRuleGroupSlotArgs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "regRuleGroupSlotArgs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {};
}

export class IHandler extends BaseContract {
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

  interface: IHandlerInterface;

  functions: {
    cname(overrides?: CallOverrides): Promise<[string]>;

    getRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getState(
      params: {
        engine: string;
        clusterArea: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        branch: BigNumberish;
        stateCounter: string;
        taskId: BigNumberish;
        caller: string;
        cmd: BigNumberish;
        args: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    regRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  cname(overrides?: CallOverrides): Promise<string>;

  getRuleGroupSlotArgs(
    clusterId: BigNumberish,
    ruleSlotIndex: BigNumberish,
    branch: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getState(
    params: {
      engine: string;
      clusterArea: string;
      clusterId: BigNumberish;
      ruleSlotIndexInput: BigNumberish;
      ruleSlotIndexOutput: BigNumberish;
      branch: BigNumberish;
      stateCounter: string;
      taskId: BigNumberish;
      caller: string;
      cmd: BigNumberish;
      args: BytesLike;
    },
    overrides?: CallOverrides
  ): Promise<string[]>;

  regRuleGroupSlotArgs(
    clusterId: BigNumberish,
    ruleSlotIndex: BigNumberish,
    branch: BigNumberish,
    args: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    cname(overrides?: CallOverrides): Promise<string>;

    getRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getState(
      params: {
        engine: string;
        clusterArea: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        branch: BigNumberish;
        stateCounter: string;
        taskId: BigNumberish;
        caller: string;
        cmd: BigNumberish;
        args: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<string[]>;

    regRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    cname(overrides?: CallOverrides): Promise<BigNumber>;

    getRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getState(
      params: {
        engine: string;
        clusterArea: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        branch: BigNumberish;
        stateCounter: string;
        taskId: BigNumberish;
        caller: string;
        cmd: BigNumberish;
        args: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    regRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cname(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getState(
      params: {
        engine: string;
        clusterArea: string;
        clusterId: BigNumberish;
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        branch: BigNumberish;
        stateCounter: string;
        taskId: BigNumberish;
        caller: string;
        cmd: BigNumberish;
        args: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    regRuleGroupSlotArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
