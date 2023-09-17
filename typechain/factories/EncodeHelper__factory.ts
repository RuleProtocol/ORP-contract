/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { EncodeHelper, EncodeHelperInterface } from "../EncodeHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "self",
        type: "address",
      },
    ],
    name: "encodeAddress",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "self",
        type: "bool",
      },
    ],
    name: "encodeBool",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "self",
        type: "bytes",
      },
    ],
    name: "encodeBytes",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "self",
        type: "int256",
      },
    ],
    name: "encodeInt",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "self",
        type: "bytes[]",
      },
    ],
    name: "encodeList",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "self",
        type: "string",
      },
    ],
    name: "encodeString",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "self",
        type: "uint256",
      },
    ],
    name: "encodeUint",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c40806100206000396000f3fe608060405234801561001057600080fd5b506004361061006d5760003560e01c806316163c891461007257806375b8de151461009b578063d30c0a64146100ae578063d32b1bea146100c1578063d93227e2146100d4578063e334f32e146100e7578063e3ac07f5146100fa575b600080fd5b6100856100803660046108f2565b61010d565b60405161009291906109b1565b60405180910390f35b6100856100a9366004610950565b61011e565b6100856100bc366004610950565b610125565b6100856100cf366004610802565b610130565b6100856100e236600461082b565b61013b565b6100856100f5366004610969565b610146565b610085610108366004610914565b61014d565b606061011882610158565b92915050565b6060610118825b6060610118826101c2565b6060610118826101d5565b6060610118826101ff565b6060610118825b606061011882610223565b604080516001808252818301909252606091600091906020820181803683370190505090508261018c57600160ff1b610192565b600160f81b5b816000815181106101a5576101a5610bde565b60200101906001600160f81b031916908160001a90535092915050565b60606101186101d083610273565b610223565b60408051600560a21b83186014820152603481019091526060906101f881610223565b9392505050565b6060600061020c836103b0565b90506101f861021d825160c06104df565b82610696565b60608082516001148015610252575060808360008151811061024757610247610bde565b016020015160f81c11155b1561025e575081610118565b6101f861026d845160806104df565b84610696565b6040805160208082528183019092526060916000919060208201818036833701905050905082602082015260005b60208110156102e7578181815181106102bc576102bc610bde565b01602001516001600160f81b031916156102d5576102e7565b806102df81610b83565b9150506102a1565b60006102f4826020610b6c565b6001600160401b0381111561030b5761030b610bf4565b6040519080825280601f01601f191660200182016040528015610335576020820181803683370190505b50905060005b81518110156103a757838361034f81610b83565b94508151811061036157610361610bde565b602001015160f81c60f81b82828151811061037e5761037e610bde565b60200101906001600160f81b031916908160001a9053508061039f81610b83565b91505061033b565b50949350505050565b60608151600014156103d057505060408051600081526020810190915290565b6000805b8351811015610417578381815181106103ef576103ef610bde565b602002602001015151826104039190610a36565b91508061040f81610b83565b9150506103d4565b6000826001600160401b0381111561043157610431610bf4565b6040519080825280601f01601f19166020018201604052801561045b576020820181803683370190505b50600092509050602081015b85518310156103a757600086848151811061048457610484610bde565b6020026020010151905060006020820190506104a283828451610713565b8785815181106104b4576104b4610bde565b602002602001015151836104c89190610a36565b9250505082806104d790610b83565b935050610467565b606080603884101561054957604080516001808252818301909252906020820181803683370190505090506105148385610a36565b601f1a60f81b8160008151811061052d5761052d610bde565b60200101906001600160f81b031916908160001a9053506101f8565b600060015b6105588187610a4e565b1561057e578161056781610b83565b9250610577905061010082610b4d565b905061054e565b610589826001610a36565b6001600160401b038111156105a0576105a0610bf4565b6040519080825280601f01601f1916602001820160405280156105ca576020820181803683370190505b5092506105d78583610a36565b6105e2906037610a36565b601f1a60f81b836000815181106105fb576105fb610bde565b60200101906001600160f81b031916908160001a905350600190505b81811161068c5761010061062b8284610b6c565b61063790610100610aa5565b6106419088610a4e565b61064b9190610b9e565b601f1a60f81b83828151811061066357610663610bde565b60200101906001600160f81b031916908160001a9053508061068481610b83565b915050610617565b5050905092915050565b6060806040519050835180825260208201818101602087015b818310156106c75780518352602092830192016106af565b50855184518101855292509050808201602086015b818310156106f45780518352602092830192016106dc565b508651929092011591909101601f01601f191660405250905092915050565b8282825b6020811061074f578151835261072e602084610a36565b925061073b602083610a36565b9150610748602082610b6c565b9050610717565b6000600161075e836020610b6c565b61076a90610100610aa5565b6107749190610b6c565b925184518416931916929092179092525050505050565b60006001600160401b038311156107a4576107a4610bf4565b6107b7601f8401601f1916602001610a06565b90508281528383830111156107cb57600080fd5b828260208301376000602084830101529392505050565b600082601f8301126107f357600080fd5b6101f88383356020850161078b565b60006020828403121561081457600080fd5b81356001600160a01b03811681146101f857600080fd5b6000602080838503121561083e57600080fd5b82356001600160401b038082111561085557600080fd5b818501915085601f83011261086957600080fd5b81358181111561087b5761087b610bf4565b8060051b61088a858201610a06565b8281528581019085870183870188018b10156108a557600080fd5b60009350835b858110156108e2578135878111156108c1578586fd5b6108cf8d8b838c01016107e2565b85525092880192908801906001016108ab565b50909a9950505050505050505050565b60006020828403121561090457600080fd5b813580151581146101f857600080fd5b60006020828403121561092657600080fd5b81356001600160401b0381111561093c57600080fd5b610948848285016107e2565b949350505050565b60006020828403121561096257600080fd5b5035919050565b60006020828403121561097b57600080fd5b81356001600160401b0381111561099157600080fd5b8201601f810184136109a257600080fd5b6109488482356020840161078b565b600060208083528351808285015260005b818110156109de578581018301518582016040015282016109c2565b818111156109f0576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f191681016001600160401b0381118282101715610a2e57610a2e610bf4565b604052919050565b60008219821115610a4957610a49610bb2565b500190565b600082610a5d57610a5d610bc8565b500490565b600181815b80851115610a9d578160001904821115610a8357610a83610bb2565b80851615610a9057918102915b93841c9390800290610a67565b509250929050565b60006101f88383600082610abb57506001610118565b81610ac857506000610118565b8160018114610ade5760028114610ae857610b04565b6001915050610118565b60ff841115610af957610af9610bb2565b50506001821b610118565b5060208310610133831016604e8410600b8410161715610b27575081810a610118565b610b318383610a62565b8060001904821115610b4557610b45610bb2565b029392505050565b6000816000190483118215151615610b6757610b67610bb2565b500290565b600082821015610b7e57610b7e610bb2565b500390565b6000600019821415610b9757610b97610bb2565b5060010190565b600082610bad57610bad610bc8565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122095d338bb8c4cb0f02435112368d7c97abfe199d2e9df9fc7ee38dc4e8a3d7c4264736f6c63430008070033";

export class EncodeHelper__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<EncodeHelper> {
    return super.deploy(overrides || {}) as Promise<EncodeHelper>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): EncodeHelper {
    return super.attach(address) as EncodeHelper;
  }
  connect(signer: Signer): EncodeHelper__factory {
    return super.connect(signer) as EncodeHelper__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EncodeHelperInterface {
    return new utils.Interface(_abi) as EncodeHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EncodeHelper {
    return new Contract(address, _abi, signerOrProvider) as EncodeHelper;
  }
}
