/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RandomGenerator,
  RandomGeneratorInterface,
} from "../RandomGenerator";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "clusterArea",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "clusterId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "ruleSlotIndexInput",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "ruleSlotIndexOutput",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "address",
        name: "stateCounter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "taskId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "random",
        type: "uint256",
      },
    ],
    name: "Random",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "blockHashTask",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "clusterArea",
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
        internalType: "address",
        name: "stateCounter",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "taskId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "clearRandom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    inputs: [
      {
        internalType: "address",
        name: "handler",
        type: "address",
      },
      {
        internalType: "address",
        name: "clusterArea",
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
        internalType: "address",
        name: "stateCounter",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "taskId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "getRandomState",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "handler",
            type: "address",
          },
          {
            internalType: "address",
            name: "clusterArea",
            type: "address",
          },
          {
            internalType: "address",
            name: "stateCounter",
            type: "address",
          },
          {
            internalType: "address",
            name: "caller",
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
            internalType: "uint32",
            name: "taskId",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "blockTimestamp",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "blockNumber",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "stdTrialMaxCount",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "trialCount",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "futureBlockNumber",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "futureBlockHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "futureBlockHashInt",
            type: "uint256",
          },
        ],
        internalType: "struct RandomGenerator.RandomState",
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
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "getTaskRandom",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "clusterArea",
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
        internalType: "address",
        name: "stateCounter",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "taskId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "makeRandom",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "clusterArea",
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
        internalType: "address",
        name: "stateCounter",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "taskId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "makeRandomBlock",
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
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "clusterArea",
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
        internalType: "address",
        name: "stateCounter",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "taskId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "makeRandomPast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "taskRandom",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
      {
        internalType: "uint8",
        name: "trialMaxCount",
        type: "uint8",
      },
    ],
    name: "updateRandomArgs",
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

const _bytecode =
  "0x608060405234801561001057600080fd5b50611506806100206000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c8063063738cb1461009e57806334c76b25146100c6578063495fb7ec146100f7578063524562271461010c57806354fd4d501461012d5780636209182e14610134578063a3ee869214610147578063a8b6733214610167578063c0ca78c614610187578063edd2b62e146101a7578063f41fdf58146101c7575b600080fd5b6100b16100ac366004610f04565b6101da565b60405190151581526020015b60405180910390f35b604080518082018252600f81526e2930b73237b6a3b2b732b930ba37b960891b602082015290516100bd919061111c565b61010a610105366004610f04565b6103f2565b005b61011f61011a366004610fa3565b61041d565b6040519081526020016100bd565b600161011f565b61010a610142366004611066565b610782565b61011f610155366004610f8a565b60016020526000908152604090205481565b61011f610175366004610f8a565b60026020526000908152604090205481565b61019a610195366004610e6d565b6107b7565b6040516100bd9190611182565b61011f6101b5366004610f8a565b60009081526002602052604090205490565b61011f6101d5366004610fa3565b6108d4565b6000806101ed338a8a8a8a8a8a8a610b42565b600081815260016020908152604082205492935061020d90839083610bbb565b90506102376040518060600160405280602c815260200161139a602c91398263ffffffff16610bda565b600061024f83600861024a846020611319565b610bbb565b9050600061025f338d8d8d610c23565b6000818152602081815260409182902054825160608101909352602c80845293945060ff169261029a92916113c6908301398260ff16610bda565b6102bf6040518060600160405280602581526020016114ac602591398460ff16610bda565b63ffffffff8416610329576102e2856102d9436002611319565b60206000610c7c565b9450610309856102f3856001611331565b60ff16600861030460006020611319565b610c7c565b600096875260016020819052604090972055509394506103e79350505050565b6040805160608101909152602280825263ffffffff8616409182916103579190611413602083013982610bda565b8015801561036a57508563ffffffff1643115b156103da5760ff831661037e866001611331565b60ff161115610398576000985050505050505050506103e7565b6103a7876102d9436002611319565b96506103b8876102f3876001611331565b600098895260016020819052604090992055509596506103e795505050505050565b6001985050505050505050505b979650505050505050565b60006104043389898989898989610b42565b6000908152600160205260408120555050505050505050565b600080610430338a8a8a8a8a8a8a610b42565b600081815260016020908152604082205492935061045090839083610bbb565b90506104916040518060400160405280601c81526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d206d73672e73656e6465720000000081525033610ca1565b6104d06040518060400160405280601d81526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d20636c7573746572417265610000008152508c610ca1565b6105136040518060400160405280601b81526020017a0b4b4b4b4b4b4b5b585ad954985b991bdb4818db1d5cdd195c9259602a1b8152508b63ffffffff16610bda565b610553604051806040016040528060188152602001770b4b4b4b4b4b4b5b585ad954985b991bdb481d185cdad25960421b8152508763ffffffff16610bda565b61058d6040518060400160405280601881526020017716969696969696b6b0b5b2a930b73237b69031b0b63632b960411b81525086610ca1565b6105cc6040518060400160405280601e81526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d20626c6f636b2e6e756d626572000081525043610bda565b6105f4604051806060016040528060238152602001611435602391398263ffffffff16610bda565b6040805180820190915260198152780b4b4b4b4b4b4b5b585ad954985b991bdb481a185cda125b9d603a1b602082015263ffffffff8216409081906106399082610bda565b60008363ffffffff164311156106c857816106775761066f60405180606001604052806032815260200161145860329139610ce6565b5060016106cc565b81156106c3576106878f84610d2c565b90506106c3604051806040016040528060188152602001772d2d2d2d2d2d2d6d616b6552616e646f6d2072616e646f6d60401b81525082610bda565b6106cc565b5060025b600381106106e65760008681526002602052604090208190555b808d63ffffffff168f6001600160a01b03167f52e3fe42d8346380423537ead5419d357dc7032ccf34168bf0095498f407b4ae8f8f8f8f8f60405161072f95949392919061129a565b60405180910390a46107706040518060400160405280601881526020017705a5a5a5a5a5a5adac2d6caa4c2dcc8deda40ccd2dcd2e6d60431b815250610ce6565b9e9d5050505050505050505050505050565b600061079033868686610c23565b6000908152602081905260409020805460ff191660ff939093169290921790915550505050565b6107bf610daf565b60006107d18a8a8a8a8a8a8a8a610b42565b90506107db610daf565b6001600160a01b03808c1682528a8116602080840191909152858216606084015263ffffffff808c16608085015261ffff808c1660a08601528a1660c085015291881660408085019190915287831660e085015243831661012085015242909216610100840152600084815260018252918220549161085b918391610bbb565b63ffffffff1661018083015261087981600861024a60006020611319565b60ff1661016083015261018082015163ffffffff16406101a083018190526101c083015260006108ab8d8c8c8c610c23565b60009081526020819052604090205460ff1661014084015250909b9a5050505050505050505050565b6000806108e7338a8a8a8a8a8a8a610b42565b90506109286040518060400160405280602081526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d50617374206d73672e73656e64657281525033610ca1565b61094a6040518060600160405280602181526020016113f2602191398a610ca1565b61098f6040518060400160405280601f81526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d5061737420636c75737465724964008152508963ffffffff16610bda565b6109d46040518060400160405280601c81526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d50617374207461736b4964000000008152508563ffffffff16610bda565b610a136040518060400160405280601c81526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d506173742063616c6c65720000000081525084610ca1565b610a3560405180606001604052806022815260200161148a6022913943610bda565b6000610a42600143611356565b4090506000610a518c83610d2c565b6000848152600260209081526040918290208390558151808301909252601c82527f2d2d2d2d2d2d2d6d616b6552616e646f6d506173742072616e646f6d0000000090820152909150610aa49082610bda565b808a63ffffffff168c6001600160a01b03167f52e3fe42d8346380423537ead5419d357dc7032ccf34168bf0095498f407b4ae8c8c8c8c8c604051610aed95949392919061129a565b60405180910390a4610b336040518060400160405280601c81526020017f2d2d2d2d2d2d2d6d616b6552616e646f6d506173742066696e69736800000000815250610ce6565b9b9a5050505050505050505050565b604080516001600160a01b03998a16602080830191909152988a168183015263ffffffff978816606082015261ffff96871660808201529490951660a085015291871660c084015290931660e0820152919093166101008083019190915283518083039091018152610120909101909252815191012090565b91821c91600080610bcf600180861b611356565b909416949350505050565b610c1f8282604051602401610bf0929190611160565b60408051601f198184030181529190526020810180516001600160e01b0316632d839cb360e21b179052610d8a565b5050565b604080516001600160a01b038616602082015263ffffffff85169181019190915261ffff80841660608301528216608082015260009060a001604051602081830303815290604052805190602001209050949350505050565b600083821b8183610c90600180881b611356565b901b19969096161795945050505050565b610c1f8282604051602401610cb7929190611136565b60408051601f198184030181529190526020810180516001600160e01b031663319af33360e01b179052610d8a565b610d2981604051602401610cfa919061111c565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052610d8a565b50565b6000805a90506000813a42864189604051602001610d4f969594939291906112d4565b60408051808303601f190181529181528151602092830120326000908152600393849052919091208054909202019081905595945050505050565b610d298160006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b604080516101e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290526101408101829052610160810182905261018081018290526101a081018290526101c081019190915290565b80356001600160a01b0381168114610e4257600080fd5b919050565b803561ffff81168114610e4257600080fd5b803563ffffffff81168114610e4257600080fd5b600080600080600080600080610100898b031215610e8a57600080fd5b610e9389610e2b565b9750610ea160208a01610e2b565b9650610eaf60408a01610e59565b9550610ebd60608a01610e47565b9450610ecb60808a01610e47565b9350610ed960a08a01610e2b565b9250610ee760c08a01610e59565b9150610ef560e08a01610e2b565b90509295985092959890939650565b600080600080600080600060e0888a031215610f1f57600080fd5b610f2888610e2b565b9650610f3660208901610e59565b9550610f4460408901610e47565b9450610f5260608901610e47565b9350610f6060808901610e2b565b9250610f6e60a08901610e59565b9150610f7c60c08901610e2b565b905092959891949750929550565b600060208284031215610f9c57600080fd5b5035919050565b600080600080600080600080610100898b031215610fc057600080fd5b883567ffffffffffffffff80821115610fd857600080fd5b818b0191508b601f830112610fec57600080fd5b813581811115610ffe57610ffe611383565b604051601f8201601f19908116603f0116810190838211818310171561102657611026611383565b816040528281528e602084870101111561103f57600080fd5b82602086016020830137600060208483010152809c505050505050610ea160208a01610e2b565b6000806000806080858703121561107c57600080fd5b61108585610e59565b935061109360208601610e47565b92506110a160408601610e47565b9150606085013560ff811681146110b757600080fd5b939692955090935050565b6001600160a01b03169052565b6000815180845260005b818110156110f5576020818501810151868301820152016110d9565b81811115611107576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061112f60208301846110cf565b9392505050565b60408152600061114960408301856110cf565b905060018060a01b03831660208301529392505050565b60408152600061117360408301856110cf565b90508260208301529392505050565b60006101e0820190506111968284516110c2565b60208301516111a860208401826110c2565b5060408301516111bb60408401826110c2565b5060608301516111ce60608401826110c2565b5060808301516111e6608084018263ffffffff169052565b5060a08301516111fc60a084018261ffff169052565b5060c083015161121260c084018261ffff169052565b5060e083015161122a60e084018263ffffffff169052565b506101008381015163ffffffff90811691840191909152610120808501518216908401526101408085015160ff90811691850191909152610160808601519091169084015261018080850151909116908301526101a080840151908301526101c092830151929091019190915290565b61ffff95861681529390941660208401526001600160a01b03918216604084015263ffffffff166060830152909116608082015260a00190565b86815285602082015284604082015283606082015260018060a01b038316608082015260c060a0820152600061130d60c08301846110cf565b98975050505050505050565b6000821982111561132c5761132c61136d565b500190565b600060ff821660ff84168060ff0382111561134e5761134e61136d565b019392505050565b6000828210156113685761136861136d565b500390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfe2d2d2d2d2d2d2d2d2d2d206d616b6552616e646f6d426c6f636b20667574757265426c6f636b4e756d6265722d2d2d2d2d2d2d2d2d2d206d616b6552616e646f6d426c6f636b2072756c65547269616c4d6178436f756e742d2d2d2d2d2d2d6d616b6552616e646f6d5061737420636c7573746572417265612d2d2d2d2d2d2d2d2d2d206d616b6552616e646f6d426c6f636b2068617368496e742d2d2d2d2d2d2d6d616b6552616e646f6d20667574757265426c6f636b4e756d6265722d2d2d2d2d2d2d6d616b6552616e646f6d20626c6f636b2e6e756d626572203e20667574757265426c6f636b4e756d6265722d2d2d2d2d2d2d6d616b6552616e646f6d5061737420626c6f636b2e6e756d6265722d2d2d2d2d2d2d2d2d2d206d616b6552616e646f6d426c6f636b20747269616c436f756e74a264697066735822122047a282c236b0264201463f699c7ffcfdd58299f15bd378fb906d431e06487a3264736f6c63430008070033";

export class RandomGenerator__factory extends ContractFactory {
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
  ): Promise<RandomGenerator> {
    return super.deploy(overrides || {}) as Promise<RandomGenerator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RandomGenerator {
    return super.attach(address) as RandomGenerator;
  }
  connect(signer: Signer): RandomGenerator__factory {
    return super.connect(signer) as RandomGenerator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RandomGeneratorInterface {
    return new utils.Interface(_abi) as RandomGeneratorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RandomGenerator {
    return new Contract(address, _abi, signerOrProvider) as RandomGenerator;
  }
}
