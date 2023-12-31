/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IClusterRuleArea,
  IClusterRuleAreaInterface,
} from "../IClusterRuleArea";

const _abi = [
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
    inputs: [
      {
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "ruleSlotIndex",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "branch",
        type: "uint8",
      },
    ],
    name: "getGroupSlot",
    outputs: [
      {
        internalType: "bool",
        name: "found",
        type: "bool",
      },
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
        internalType: "struct Rule.GroupSlot",
        name: "",
        type: "tuple",
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
        name: "ruleSlotIndex",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "branch",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "handler",
        type: "address",
      },
    ],
    name: "getGroupSlotHandlerArgs",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
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

export class IClusterRuleArea__factory {
  static readonly abi = _abi;
  static createInterface(): IClusterRuleAreaInterface {
    return new utils.Interface(_abi) as IClusterRuleAreaInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IClusterRuleArea {
    return new Contract(address, _abi, signerOrProvider) as IClusterRuleArea;
  }
}
