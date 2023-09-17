/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  GovernorCheckTest,
  GovernorCheckTestInterface,
} from "../GovernorCheckTest";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "caller",
            type: "address",
          },
          {
            internalType: "address",
            name: "clusterRuleAreaAddress",
            type: "address",
          },
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
            name: "groupInputBranch",
            type: "uint8",
          },
        ],
        internalType: "struct GovernorCheckTest.GovernorCheckData",
        name: "governorCheckData",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "voteMode",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "handlerAddress",
        type: "address",
      },
    ],
    name: "getSucceedParams",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voteFairMode",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voteNormalMode",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610b27806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063217b218f146100465780632a6c47ef1461007d578063f6b990ed14610097575b600080fd5b6100596100543660046108b3565b61009f565b6040805161ffff909316835263ffffffff9091166020830152015b60405180910390f35b610085600181565b60405160ff9091168152602001610074565b610085600281565b6000806100de60405180604001604052806016815260200175636c757374657252756c65417265614164647265737360501b81525086602001516102ee565b61011a604051806040016040528060128152602001711c9d5b1954db1bdd125b99195e125b9c1d5d60721b815250866060015161ffff16610337565b610157604051806040016040528060138152602001721c9d5b1954db1bdd125b99195e13dd5d1c1d5d606a1b815250866080015161ffff16610337565b61018c6040518060400160405280600981526020016818db1d5cdd195c925960ba1b815250866040015163ffffffff16610337565b6101bb604051806040016040528060068152602001650c4e4c2dcc6d60d31b8152508660a0015160ff16610337565b6020850151604080870151606088015160a08901519251631b606bcf60e01b815263ffffffff909216600483015261ffff16602482015260ff90911660448201526001600160a01b0385811660648301526000921690631b606bcf9060840160006040518083038186803b15801561023257600080fd5b505afa158015610246573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261026e9190810190610806565b905061029e6040518060400160405280600b81526020016a0c2e4cee640d8cadccee8d60ab1b8152508251610337565b60ff8516600214156102ca576102b581600061037c565b6102c082600261037c565b92509250506102e6565b6102d581600061037c565b6102e082600161037c565b92509250505b935093915050565b610333828260405160240161030492919061099d565b60408051601f198184030181529190526020810180516001600160e01b031663319af33360e01b179052610409565b5050565b610333828260405160240161034d9291906109c7565b60408051601f198184030181529190526020810180516001600160e01b0316632d839cb360e21b179052610409565b6000806103b86103b38560408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b610415565b90506104016103e2828560ff16815181106103d5576103d5610ac5565b6020026020010151610415565b6002815181106103f4576103f4610ac5565b602002602001015161052b565b949350505050565b61041281610578565b50565b606061042082610599565b61042957600080fd5b6000610434836105d2565b905060008167ffffffffffffffff81111561045157610451610adb565b60405190808252806020026020018201604052801561049657816020015b604080518082019091526000808252602082015281526020019060019003908161046f5790505b50905060006104a88560200151610655565b85602001516104b79190610a12565b90506000805b84811015610520576104ce836106d7565b91506040518060400160405280838152602001848152508482815181106104f7576104f7610ac5565b602090810291909101015261050c8284610a12565b92508061051881610a94565b9150506104bd565b509195945050505050565b80516000901580159061054057508151602110155b61054957600080fd5b60008061055584610780565b8151919350915060208210156104015760208290036101000a9004949350505050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b80516000906105aa57506000919050565b6020820151805160001a9060c08210156105c8575060009392505050565b5060019392505050565b80516000906105e357506000919050565b6000806105f38460200151610655565b84602001516106029190610a12565b905060008460000151856020015161061a9190610a12565b90505b8082101561064c5761062e826106d7565b6106389083610a12565b91508261064481610a94565b93505061061d565b50909392505050565b8051600090811a608081101561066e5750600092915050565b60b8811080610689575060c08110801590610689575060f881105b156106975750600192915050565b60c08110156106cb576106ac600160b8610a41565b6106b99060ff1682610a2a565b6106c4906001610a12565b9392505050565b6106ac600160f8610a41565b80516000908190811a60808110156106f25760019150610779565b60b881101561071857610706608082610a2a565b610711906001610a12565b9150610779565b60c08110156107455760b78103600185019450806020036101000a85510460018201810193505050610779565b60f88110156107595761070660c082610a2a565b60f78103600185019450806020036101000a855104600182018101935050505b5092915050565b60008060006107928460200151610655565b905060008185602001516107a69190610a12565b905060008286600001516107ba9190610a2a565b9196919550909350505050565b80356001600160a01b03811681146107de57600080fd5b919050565b803561ffff811681146107de57600080fd5b803560ff811681146107de57600080fd5b60006020828403121561081857600080fd5b815167ffffffffffffffff8082111561083057600080fd5b818401915084601f83011261084457600080fd5b81518181111561085657610856610adb565b604051601f8201601f19908116603f0116810190838211818310171561087e5761087e610adb565b8160405282815287602084870101111561089757600080fd5b6108a8836020830160208801610a64565b979650505050505050565b60008060008385036101008112156108ca57600080fd5b60c08112156108d857600080fd5b506108e16109e9565b6108ea856107c7565b81526108f8602086016107c7565b6020820152604085013563ffffffff8116811461091457600080fd5b6040820152610925606086016107e3565b6060820152610936608086016107e3565b608082015261094760a086016107f5565b60a0820152925061095a60c085016107f5565b915061096860e085016107c7565b90509250925092565b60008151808452610989816020860160208601610a64565b601f01601f19169290920160200192915050565b6040815260006109b06040830185610971565b905060018060a01b03831660208301529392505050565b6040815260006109da6040830185610971565b90508260208301529392505050565b60405160c0810167ffffffffffffffff81118282101715610a0c57610a0c610adb565b60405290565b60008219821115610a2557610a25610aaf565b500190565b600082821015610a3c57610a3c610aaf565b500390565b600060ff821660ff841680821015610a5b57610a5b610aaf565b90039392505050565b60005b83811015610a7f578181015183820152602001610a67565b83811115610a8e576000848401525b50505050565b6000600019821415610aa857610aa8610aaf565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220ab32f2ac5ca2fc40a1f93c277057b44b0c84897ad796785b6324edf4f0f89a4564736f6c63430008070033";

export class GovernorCheckTest__factory extends ContractFactory {
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
  ): Promise<GovernorCheckTest> {
    return super.deploy(overrides || {}) as Promise<GovernorCheckTest>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): GovernorCheckTest {
    return super.attach(address) as GovernorCheckTest;
  }
  connect(signer: Signer): GovernorCheckTest__factory {
    return super.connect(signer) as GovernorCheckTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GovernorCheckTestInterface {
    return new utils.Interface(_abi) as GovernorCheckTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GovernorCheckTest {
    return new Contract(address, _abi, signerOrProvider) as GovernorCheckTest;
  }
}
