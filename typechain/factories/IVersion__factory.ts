/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVersion, IVersionInterface } from "../IVersion";

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

export class IVersion__factory {
  static readonly abi = _abi;
  static createInterface(): IVersionInterface {
    return new utils.Interface(_abi) as IVersionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVersion {
    return new Contract(address, _abi, signerOrProvider) as IVersion;
  }
}
