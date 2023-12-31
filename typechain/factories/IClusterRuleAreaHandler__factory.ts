/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IClusterRuleAreaHandler,
  IClusterRuleAreaHandlerInterface,
} from "../IClusterRuleAreaHandler";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "regType",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "ruleSlotIndex1",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "ruleSlotIndex2",
        type: "uint8",
      },
    ],
    name: "EventClusterHandler",
    type: "event",
  },
  {
    inputs: [],
    name: "cname",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getClusterArea",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEngine",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
    ],
    name: "getHandlerList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
    ],
    name: "getHandlerPoolList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolFee",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexInput",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexOutput",
        type: "uint16",
      },
    ],
    name: "getPostHandlerList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexInput",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexOutput",
        type: "uint16",
      },
    ],
    name: "getPreHandlerList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexInput",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexOutput",
        type: "uint16",
      },
    ],
    name: "getProcessHandlerList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexInput",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexOutput",
        type: "uint16",
      },
    ],
    name: "getSnippet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "erc",
                        type: "uint8",
                      },
                      {
                        internalType: "address",
                        name: "token",
                        type: "address",
                      },
                      {
                        internalType: "uint256[]",
                        name: "valueList",
                        type: "uint256[]",
                      },
                    ],
                    internalType: "struct Token.TokenTemplate",
                    name: "tokenTemplate",
                    type: "tuple",
                  },
                  {
                    internalType: "uint8",
                    name: "rule",
                    type: "uint8",
                  },
                  {
                    internalType: "address[]",
                    name: "ioAddressList",
                    type: "address[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "valueList",
                    type: "uint256[]",
                  },
                ],
                internalType: "struct Rule.TokenSlot[]",
                name: "tokenSlotList",
                type: "tuple[]",
              },
              {
                internalType: "uint8",
                name: "branch",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "poolToken",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "handlerList",
                type: "address[]",
              },
              {
                internalType: "bytes[]",
                name: "argsList",
                type: "bytes[]",
              },
            ],
            internalType: "struct Rule.GroupSlot[]",
            name: "groupSlotList",
            type: "tuple[]",
          },
          {
            internalType: "uint8[]",
            name: "ruleSlotBound",
            type: "uint8[]",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "ruleSlotIndexInput",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "ruleSlotIndexOutput",
                type: "uint16",
              },
              {
                internalType: "uint8",
                name: "state",
                type: "uint8",
              },
              {
                internalType: "uint32",
                name: "totalCount",
                type: "uint32",
              },
              {
                internalType: "uint8",
                name: "durationType",
                type: "uint8",
              },
              {
                internalType: "uint32",
                name: "delayTimestamp",
                type: "uint32",
              },
              {
                internalType: "uint32",
                name: "delayBlockNumber",
                type: "uint32",
              },
              {
                internalType: "uint64",
                name: "handlerCount",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "handlerList",
                type: "address[]",
              },
              {
                internalType: "bytes[]",
                name: "handlerArgsList",
                type: "bytes[]",
              },
              {
                internalType: "address",
                name: "snippet",
                type: "address",
              },
            ],
            internalType: "struct Rule.Rule[]",
            name: "ruleList",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "attrId",
                type: "uint32",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
              {
                internalType: "string",
                name: "uri",
                type: "string",
              },
              {
                internalType: "uint8",
                name: "level",
                type: "uint8",
              },
            ],
            internalType: "struct Attribute.Attribute[]",
            name: "attrList",
            type: "tuple[]",
          },
          {
            internalType: "uint8[]",
            name: "attrStateList",
            type: "uint8[]",
          },
          {
            internalType: "address[]",
            name: "deployerList",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "adminList",
            type: "address[]",
          },
          {
            internalType: "uint32",
            name: "delayTimestamp",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "delayBlockNumber",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        internalType: "struct Cluster.Cluster",
        name: "cluster",
        type: "tuple",
      },
    ],
    name: "registerHandlerList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexInput",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndexOutput",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "cmd",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "handler",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
    ],
    name: "updateHandlerArgs",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "ruleSlotIndexInput",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "ruleSlotIndexOutput",
            type: "uint16",
          },
          {
            internalType: "uint8",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "totalCount",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "durationType",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "delayTimestamp",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "delayBlockNumber",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "handlerCount",
            type: "uint64",
          },
          {
            internalType: "address[]",
            name: "handlerList",
            type: "address[]",
          },
          {
            internalType: "bytes[]",
            name: "handlerArgsList",
            type: "bytes[]",
          },
          {
            internalType: "address",
            name: "snippet",
            type: "address",
          },
        ],
        internalType: "struct Rule.Rule[]",
        name: "ruleList",
        type: "tuple[]",
      },
    ],
    name: "updateHandlerList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

export class IClusterRuleAreaHandler__factory {
  static readonly abi = _abi;
  static createInterface(): IClusterRuleAreaHandlerInterface {
    return new utils.Interface(_abi) as IClusterRuleAreaHandlerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IClusterRuleAreaHandler {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IClusterRuleAreaHandler;
  }
}
