/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IGovHandler, IGovHandlerInterface } from "../IGovHandler";

const _abi = [
  {
    inputs: [
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
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "attrId",
                type: "uint32",
              },
              {
                internalType: "int40",
                name: "attrAmount",
                type: "int40",
              },
            ],
            internalType: "struct Token.AttributeIn[]",
            name: "attrInList",
            type: "tuple[]",
          },
        ],
        internalType: "struct Token.Token[]",
        name: "inTokenList",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "checkInTokenList",
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
];

export class IGovHandler__factory {
  static readonly abi = _abi;
  static createInterface(): IGovHandlerInterface {
    return new utils.Interface(_abi) as IGovHandlerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGovHandler {
    return new Contract(address, _abi, signerOrProvider) as IGovHandler;
  }
}
