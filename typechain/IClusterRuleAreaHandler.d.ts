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

interface IClusterRuleAreaHandlerInterface extends ethers.utils.Interface {
  functions: {
    "cname()": FunctionFragment;
    "getClusterArea()": FunctionFragment;
    "getEngine()": FunctionFragment;
    "getHandlerList(uint32)": FunctionFragment;
    "getHandlerPoolList(uint32)": FunctionFragment;
    "getPoolContract()": FunctionFragment;
    "getPoolFee()": FunctionFragment;
    "getPostHandlerList(uint32,uint16,uint16)": FunctionFragment;
    "getPreHandlerList(uint32,uint16,uint16)": FunctionFragment;
    "getProcessHandlerList(uint32,uint16,uint16)": FunctionFragment;
    "getSnippet(uint32,uint16,uint16)": FunctionFragment;
    "registerHandlerList(uint32,(tuple[],uint8[],tuple[],tuple[],uint8[],address[],address[],uint32,uint32,uint8,string))": FunctionFragment;
    "updateHandlerArgs(uint32,uint16,uint16,uint8,address,bytes)": FunctionFragment;
    "updateHandlerList(uint32,tuple[])": FunctionFragment;
    "version()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "cname", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getClusterArea",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getEngine", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getHandlerList",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getHandlerPoolList",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPostHandlerList",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPreHandlerList",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProcessHandlerList",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSnippet",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "registerHandlerList",
    values: [
      BigNumberish,
      {
        groupSlotList: {
          tokenSlotList: {
            tokenTemplate: {
              erc: BigNumberish;
              token: string;
              valueList: BigNumberish[];
            };
            rule: BigNumberish;
            ioAddressList: string[];
            valueList: BigNumberish[];
          }[];
          branch: BigNumberish;
          poolToken: string;
          handlerList: string[];
          argsList: BytesLike[];
        }[];
        ruleSlotBound: BigNumberish[];
        ruleList: {
          ruleSlotIndexInput: BigNumberish;
          ruleSlotIndexOutput: BigNumberish;
          state: BigNumberish;
          totalCount: BigNumberish;
          durationType: BigNumberish;
          delayTimestamp: BigNumberish;
          delayBlockNumber: BigNumberish;
          handlerCount: BigNumberish;
          handlerList: string[];
          handlerArgsList: BytesLike[];
          snippet: string;
        }[];
        attrList: {
          attrId: BigNumberish;
          name: string;
          symbol: string;
          uri: string;
          level: BigNumberish;
        }[];
        attrStateList: BigNumberish[];
        deployerList: string[];
        adminList: string[];
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        state: BigNumberish;
        description: string;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateHandlerArgs",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateHandlerList",
    values: [
      BigNumberish,
      {
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        state: BigNumberish;
        totalCount: BigNumberish;
        durationType: BigNumberish;
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        handlerCount: BigNumberish;
        handlerList: string[];
        handlerArgsList: BytesLike[];
        snippet: string;
      }[]
    ]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "cname", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getClusterArea",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getEngine", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getHandlerList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHandlerPoolList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPoolFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPostHandlerList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPreHandlerList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProcessHandlerList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSnippet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerHandlerList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateHandlerArgs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateHandlerList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "EventClusterHandler(address,uint8,uint32,uint8,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EventClusterHandler"): EventFragment;
}

export type EventClusterHandlerEvent = TypedEvent<
  [string, number, number, number, number] & {
    caller: string;
    regType: number;
    clusterId: number;
    ruleSlotIndex1: number;
    ruleSlotIndex2: number;
  }
>;

export class IClusterRuleAreaHandler extends BaseContract {
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

  interface: IClusterRuleAreaHandlerInterface;

  functions: {
    cname(overrides?: CallOverrides): Promise<[string]>;

    getClusterArea(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getEngine(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getHandlerList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getHandlerPoolList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getPoolContract(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPoolFee(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPostHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getPreHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getProcessHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getSnippet(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    registerHandlerList(
      clusterId: BigNumberish,
      cluster: {
        groupSlotList: {
          tokenSlotList: {
            tokenTemplate: {
              erc: BigNumberish;
              token: string;
              valueList: BigNumberish[];
            };
            rule: BigNumberish;
            ioAddressList: string[];
            valueList: BigNumberish[];
          }[];
          branch: BigNumberish;
          poolToken: string;
          handlerList: string[];
          argsList: BytesLike[];
        }[];
        ruleSlotBound: BigNumberish[];
        ruleList: {
          ruleSlotIndexInput: BigNumberish;
          ruleSlotIndexOutput: BigNumberish;
          state: BigNumberish;
          totalCount: BigNumberish;
          durationType: BigNumberish;
          delayTimestamp: BigNumberish;
          delayBlockNumber: BigNumberish;
          handlerCount: BigNumberish;
          handlerList: string[];
          handlerArgsList: BytesLike[];
          snippet: string;
        }[];
        attrList: {
          attrId: BigNumberish;
          name: string;
          symbol: string;
          uri: string;
          level: BigNumberish;
        }[];
        attrStateList: BigNumberish[];
        deployerList: string[];
        adminList: string[];
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        state: BigNumberish;
        description: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      cmd: BigNumberish,
      handler: string,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateHandlerList(
      clusterId: BigNumberish,
      ruleList: {
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        state: BigNumberish;
        totalCount: BigNumberish;
        durationType: BigNumberish;
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        handlerCount: BigNumberish;
        handlerList: string[];
        handlerArgsList: BytesLike[];
        snippet: string;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  cname(overrides?: CallOverrides): Promise<string>;

  getClusterArea(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getEngine(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getHandlerList(
    clusterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getHandlerPoolList(
    clusterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getPoolContract(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPoolFee(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPostHandlerList(
    clusterId: BigNumberish,
    ruleSlotIndexInput: BigNumberish,
    ruleSlotIndexOutput: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getPreHandlerList(
    clusterId: BigNumberish,
    ruleSlotIndexInput: BigNumberish,
    ruleSlotIndexOutput: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getProcessHandlerList(
    clusterId: BigNumberish,
    ruleSlotIndexInput: BigNumberish,
    ruleSlotIndexOutput: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getSnippet(
    clusterId: BigNumberish,
    ruleSlotIndexInput: BigNumberish,
    ruleSlotIndexOutput: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  registerHandlerList(
    clusterId: BigNumberish,
    cluster: {
      groupSlotList: {
        tokenSlotList: {
          tokenTemplate: {
            erc: BigNumberish;
            token: string;
            valueList: BigNumberish[];
          };
          rule: BigNumberish;
          ioAddressList: string[];
          valueList: BigNumberish[];
        }[];
        branch: BigNumberish;
        poolToken: string;
        handlerList: string[];
        argsList: BytesLike[];
      }[];
      ruleSlotBound: BigNumberish[];
      ruleList: {
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        state: BigNumberish;
        totalCount: BigNumberish;
        durationType: BigNumberish;
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        handlerCount: BigNumberish;
        handlerList: string[];
        handlerArgsList: BytesLike[];
        snippet: string;
      }[];
      attrList: {
        attrId: BigNumberish;
        name: string;
        symbol: string;
        uri: string;
        level: BigNumberish;
      }[];
      attrStateList: BigNumberish[];
      deployerList: string[];
      adminList: string[];
      delayTimestamp: BigNumberish;
      delayBlockNumber: BigNumberish;
      state: BigNumberish;
      description: string;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateHandlerArgs(
    clusterId: BigNumberish,
    ruleSlotIndexInput: BigNumberish,
    ruleSlotIndexOutput: BigNumberish,
    cmd: BigNumberish,
    handler: string,
    args: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateHandlerList(
    clusterId: BigNumberish,
    ruleList: {
      ruleSlotIndexInput: BigNumberish;
      ruleSlotIndexOutput: BigNumberish;
      state: BigNumberish;
      totalCount: BigNumberish;
      durationType: BigNumberish;
      delayTimestamp: BigNumberish;
      delayBlockNumber: BigNumberish;
      handlerCount: BigNumberish;
      handlerList: string[];
      handlerArgsList: BytesLike[];
      snippet: string;
    }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    cname(overrides?: CallOverrides): Promise<string>;

    getClusterArea(overrides?: CallOverrides): Promise<string>;

    getEngine(overrides?: CallOverrides): Promise<string>;

    getHandlerList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getHandlerPoolList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getPoolContract(overrides?: CallOverrides): Promise<string>;

    getPoolFee(overrides?: CallOverrides): Promise<string>;

    getPostHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getPreHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getProcessHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getSnippet(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    registerHandlerList(
      clusterId: BigNumberish,
      cluster: {
        groupSlotList: {
          tokenSlotList: {
            tokenTemplate: {
              erc: BigNumberish;
              token: string;
              valueList: BigNumberish[];
            };
            rule: BigNumberish;
            ioAddressList: string[];
            valueList: BigNumberish[];
          }[];
          branch: BigNumberish;
          poolToken: string;
          handlerList: string[];
          argsList: BytesLike[];
        }[];
        ruleSlotBound: BigNumberish[];
        ruleList: {
          ruleSlotIndexInput: BigNumberish;
          ruleSlotIndexOutput: BigNumberish;
          state: BigNumberish;
          totalCount: BigNumberish;
          durationType: BigNumberish;
          delayTimestamp: BigNumberish;
          delayBlockNumber: BigNumberish;
          handlerCount: BigNumberish;
          handlerList: string[];
          handlerArgsList: BytesLike[];
          snippet: string;
        }[];
        attrList: {
          attrId: BigNumberish;
          name: string;
          symbol: string;
          uri: string;
          level: BigNumberish;
        }[];
        attrStateList: BigNumberish[];
        deployerList: string[];
        adminList: string[];
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        state: BigNumberish;
        description: string;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    updateHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      cmd: BigNumberish,
      handler: string,
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateHandlerList(
      clusterId: BigNumberish,
      ruleList: {
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        state: BigNumberish;
        totalCount: BigNumberish;
        durationType: BigNumberish;
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        handlerCount: BigNumberish;
        handlerList: string[];
        handlerArgsList: BytesLike[];
        snippet: string;
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "EventClusterHandler(address,uint8,uint32,uint8,uint8)"(
      caller?: string | null,
      regType?: BigNumberish | null,
      clusterId?: BigNumberish | null,
      ruleSlotIndex1?: null,
      ruleSlotIndex2?: null
    ): TypedEventFilter<
      [string, number, number, number, number],
      {
        caller: string;
        regType: number;
        clusterId: number;
        ruleSlotIndex1: number;
        ruleSlotIndex2: number;
      }
    >;

    EventClusterHandler(
      caller?: string | null,
      regType?: BigNumberish | null,
      clusterId?: BigNumberish | null,
      ruleSlotIndex1?: null,
      ruleSlotIndex2?: null
    ): TypedEventFilter<
      [string, number, number, number, number],
      {
        caller: string;
        regType: number;
        clusterId: number;
        ruleSlotIndex1: number;
        ruleSlotIndex2: number;
      }
    >;
  };

  estimateGas: {
    cname(overrides?: CallOverrides): Promise<BigNumber>;

    getClusterArea(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getEngine(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getHandlerList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHandlerPoolList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolContract(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPoolFee(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPostHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPreHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProcessHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSnippet(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerHandlerList(
      clusterId: BigNumberish,
      cluster: {
        groupSlotList: {
          tokenSlotList: {
            tokenTemplate: {
              erc: BigNumberish;
              token: string;
              valueList: BigNumberish[];
            };
            rule: BigNumberish;
            ioAddressList: string[];
            valueList: BigNumberish[];
          }[];
          branch: BigNumberish;
          poolToken: string;
          handlerList: string[];
          argsList: BytesLike[];
        }[];
        ruleSlotBound: BigNumberish[];
        ruleList: {
          ruleSlotIndexInput: BigNumberish;
          ruleSlotIndexOutput: BigNumberish;
          state: BigNumberish;
          totalCount: BigNumberish;
          durationType: BigNumberish;
          delayTimestamp: BigNumberish;
          delayBlockNumber: BigNumberish;
          handlerCount: BigNumberish;
          handlerList: string[];
          handlerArgsList: BytesLike[];
          snippet: string;
        }[];
        attrList: {
          attrId: BigNumberish;
          name: string;
          symbol: string;
          uri: string;
          level: BigNumberish;
        }[];
        attrStateList: BigNumberish[];
        deployerList: string[];
        adminList: string[];
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        state: BigNumberish;
        description: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      cmd: BigNumberish,
      handler: string,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateHandlerList(
      clusterId: BigNumberish,
      ruleList: {
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        state: BigNumberish;
        totalCount: BigNumberish;
        durationType: BigNumberish;
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        handlerCount: BigNumberish;
        handlerList: string[];
        handlerArgsList: BytesLike[];
        snippet: string;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cname(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getClusterArea(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getEngine(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getHandlerList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHandlerPoolList(
      clusterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolContract(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPoolFee(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPostHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPreHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProcessHandlerList(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSnippet(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerHandlerList(
      clusterId: BigNumberish,
      cluster: {
        groupSlotList: {
          tokenSlotList: {
            tokenTemplate: {
              erc: BigNumberish;
              token: string;
              valueList: BigNumberish[];
            };
            rule: BigNumberish;
            ioAddressList: string[];
            valueList: BigNumberish[];
          }[];
          branch: BigNumberish;
          poolToken: string;
          handlerList: string[];
          argsList: BytesLike[];
        }[];
        ruleSlotBound: BigNumberish[];
        ruleList: {
          ruleSlotIndexInput: BigNumberish;
          ruleSlotIndexOutput: BigNumberish;
          state: BigNumberish;
          totalCount: BigNumberish;
          durationType: BigNumberish;
          delayTimestamp: BigNumberish;
          delayBlockNumber: BigNumberish;
          handlerCount: BigNumberish;
          handlerList: string[];
          handlerArgsList: BytesLike[];
          snippet: string;
        }[];
        attrList: {
          attrId: BigNumberish;
          name: string;
          symbol: string;
          uri: string;
          level: BigNumberish;
        }[];
        attrStateList: BigNumberish[];
        deployerList: string[];
        adminList: string[];
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        state: BigNumberish;
        description: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateHandlerArgs(
      clusterId: BigNumberish,
      ruleSlotIndexInput: BigNumberish,
      ruleSlotIndexOutput: BigNumberish,
      cmd: BigNumberish,
      handler: string,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateHandlerList(
      clusterId: BigNumberish,
      ruleList: {
        ruleSlotIndexInput: BigNumberish;
        ruleSlotIndexOutput: BigNumberish;
        state: BigNumberish;
        totalCount: BigNumberish;
        durationType: BigNumberish;
        delayTimestamp: BigNumberish;
        delayBlockNumber: BigNumberish;
        handlerCount: BigNumberish;
        handlerList: string[];
        handlerArgsList: BytesLike[];
        snippet: string;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}