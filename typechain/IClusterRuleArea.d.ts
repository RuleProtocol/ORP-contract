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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IClusterRuleAreaInterface extends ethers.utils.Interface {
  functions: {
    "cname()": FunctionFragment;
    "getGroupSlot(uint32,uint16,uint8)": FunctionFragment;
    "getGroupSlotHandlerArgs(uint32,uint16,uint8,address)": FunctionFragment;
    "version()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "cname", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getGroupSlot",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getGroupSlotHandlerArgs",
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "cname", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getGroupSlot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGroupSlotHandlerArgs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {};
}

export class IClusterRuleArea extends BaseContract {
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

  interface: IClusterRuleAreaInterface;

  functions: {
    cname(overrides?: CallOverrides): Promise<[string]>;

    getGroupSlot(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        boolean,
        [
          ([
            [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            },
            number,
            string[],
            BigNumber[]
          ] & {
            tokenTemplate: [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            };
            rule: number;
            ioAddressList: string[];
            valueList: BigNumber[];
          })[],
          number,
          string,
          string[],
          string[]
        ] & {
          tokenSlotList: ([
            [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            },
            number,
            string[],
            BigNumber[]
          ] & {
            tokenTemplate: [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            };
            rule: number;
            ioAddressList: string[];
            valueList: BigNumber[];
          })[];
          branch: number;
          poolToken: string;
          handlerList: string[];
          argsList: string[];
        }
      ] & { found: boolean }
    >;

    getGroupSlotHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      handler: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    version(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  cname(overrides?: CallOverrides): Promise<string>;

  getGroupSlot(
    clusterId: BigNumberish,
    ruleSlotIndex: BigNumberish,
    branch: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      boolean,
      [
        ([
          [number, string, BigNumber[]] & {
            erc: number;
            token: string;
            valueList: BigNumber[];
          },
          number,
          string[],
          BigNumber[]
        ] & {
          tokenTemplate: [number, string, BigNumber[]] & {
            erc: number;
            token: string;
            valueList: BigNumber[];
          };
          rule: number;
          ioAddressList: string[];
          valueList: BigNumber[];
        })[],
        number,
        string,
        string[],
        string[]
      ] & {
        tokenSlotList: ([
          [number, string, BigNumber[]] & {
            erc: number;
            token: string;
            valueList: BigNumber[];
          },
          number,
          string[],
          BigNumber[]
        ] & {
          tokenTemplate: [number, string, BigNumber[]] & {
            erc: number;
            token: string;
            valueList: BigNumber[];
          };
          rule: number;
          ioAddressList: string[];
          valueList: BigNumber[];
        })[];
        branch: number;
        poolToken: string;
        handlerList: string[];
        argsList: string[];
      }
    ] & { found: boolean }
  >;

  getGroupSlotHandlerArgs(
    clusterId: BigNumberish,
    ruleSlotIndex: BigNumberish,
    branch: BigNumberish,
    handler: string,
    overrides?: CallOverrides
  ): Promise<string>;

  version(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    cname(overrides?: CallOverrides): Promise<string>;

    getGroupSlot(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        boolean,
        [
          ([
            [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            },
            number,
            string[],
            BigNumber[]
          ] & {
            tokenTemplate: [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            };
            rule: number;
            ioAddressList: string[];
            valueList: BigNumber[];
          })[],
          number,
          string,
          string[],
          string[]
        ] & {
          tokenSlotList: ([
            [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            },
            number,
            string[],
            BigNumber[]
          ] & {
            tokenTemplate: [number, string, BigNumber[]] & {
              erc: number;
              token: string;
              valueList: BigNumber[];
            };
            rule: number;
            ioAddressList: string[];
            valueList: BigNumber[];
          })[];
          branch: number;
          poolToken: string;
          handlerList: string[];
          argsList: string[];
        }
      ] & { found: boolean }
    >;

    getGroupSlotHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      handler: string,
      overrides?: CallOverrides
    ): Promise<string>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    cname(overrides?: CallOverrides): Promise<BigNumber>;

    getGroupSlot(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getGroupSlotHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      handler: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cname(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getGroupSlot(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGroupSlotHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndex: BigNumberish,
      branch: BigNumberish,
      handler: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
