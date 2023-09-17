/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TimelockController,
  TimelockControllerInterface,
} from "../TimelockController";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minDelay",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "proposers",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "executors",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "CallExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "CallScheduled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "Cancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldDuration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDuration",
        type: "uint256",
      },
    ],
    name: "MinDelayChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "CANCELLER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EXECUTOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PROPOSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TIMELOCK_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "payloads",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "executeBatch",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMinDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "getTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "hashOperation",
    outputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "payloads",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "hashOperationBatch",
    outputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperation",
    outputs: [
      {
        internalType: "bool",
        name: "registered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperationDone",
    outputs: [
      {
        internalType: "bool",
        name: "done",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperationPending",
    outputs: [
      {
        internalType: "bool",
        name: "pending",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperationReady",
    outputs: [
      {
        internalType: "bool",
        name: "ready",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "schedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "payloads",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "scheduleBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newDelay",
        type: "uint256",
      },
    ],
    name: "updateDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002268380380620022688339810160408190526200003491620003f8565b6200004f600080516020620021e8833981519152806200022d565b6200007960008051602062002208833981519152600080516020620021e88339815191526200022d565b620000a360008051602062002228833981519152600080516020620021e88339815191526200022d565b620000cd60008051602062002248833981519152600080516020620021e88339815191526200022d565b620000e8600080516020620021e88339815191523062000278565b6001600160a01b03811615620001135762000113600080516020620021e88339815191528262000278565b60005b835181101562000199576200015d60008051602062002208833981519152858381518110620001495762000149620004a9565b60200260200101516200027860201b60201c565b6200018660008051602062002248833981519152858381518110620001495762000149620004a9565b62000191816200047f565b905062000116565b5060005b8251811015620001e357620001d060008051602062002228833981519152848381518110620001495762000149620004a9565b620001db816200047f565b90506200019d565b5060028490556040805160008152602081018690527f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5910160405180910390a150505050620004d5565b600082815260208190526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b62000284828262000288565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1662000284576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620002e43390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b80516001600160a01b03811681146200034057600080fd5b919050565b600082601f8301126200035757600080fd5b815160206001600160401b0380831115620003765762000376620004bf565b8260051b604051601f19603f830116810181811084821117156200039e576200039e620004bf565b60405284815283810192508684018288018501891015620003be57600080fd5b600092505b85831015620003ec57620003d78162000328565b845292840192600192909201918401620003c3565b50979650505050505050565b600080600080608085870312156200040f57600080fd5b845160208601519094506001600160401b03808211156200042f57600080fd5b6200043d8883890162000345565b945060408701519150808211156200045457600080fd5b50620004638782880162000345565b925050620004746060860162000328565b905092959194509250565b6000600019821415620004a257634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b611d0380620004e56000396000f3fe60806040526004361061015b5760003560e01c80638065657f116100bc5780638065657f1461039a5780638f2a0bb0146103ba5780638f61f4f5146103da57806391d14854146103fc578063a217fddf1461041c578063b08e51c014610431578063b1c5f42714610465578063bc197c8114610485578063c4d252f5146104b1578063d45c4435146104d1578063d547741f146104fe578063e38335e51461051e578063f23a6e6114610531578063f27a0c921461055d57600080fd5b806301d5062a1461016757806301ffc9a71461018957806307bd0265146101be5780630d3cf6fc146101ee578063134008d31461022257806313bc9f2014610235578063150b7a0214610255578063248a9ca3146102995780632ab0f529146102c95780632f2ff15d146102fa57806331d507501461031a57806336568abe1461033a578063584b153e1461035a57806364d623531461037a57600080fd5b3661016257005b600080fd5b34801561017357600080fd5b506101876101823660046115ee565b610572565b005b34801561019557600080fd5b506101a96101a4366004611800565b6105f5565b60405190151581526020015b60405180910390f35b3480156101ca57600080fd5b506101e0600080516020611cae83398151915281565b6040519081526020016101b5565b3480156101fa57600080fd5b506101e07f5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca581565b610187610230366004611583565b610620565b34801561024157600080fd5b506101a96102503660046117bb565b6106c3565b34801561026157600080fd5b506102806102703660046114b8565b630a85bd0160e11b949350505050565b6040516001600160e01b031990911681526020016101b5565b3480156102a557600080fd5b506101e06102b43660046117bb565b60009081526020819052604090206001015490565b3480156102d557600080fd5b506101a96102e43660046117bb565b6000908152600160208190526040909120541490565b34801561030657600080fd5b506101876103153660046117d4565b6106e9565b34801561032657600080fd5b506101a96103353660046117bb565b610713565b34801561034657600080fd5b506101876103553660046117d4565b61072c565b34801561036657600080fd5b506101a96103753660046117bb565b6107af565b34801561038657600080fd5b506101876103953660046117bb565b6107c5565b3480156103a657600080fd5b506101e06103b5366004611583565b610831565b3480156103c657600080fd5b506101876103d536600461170a565b610870565b3480156103e657600080fd5b506101e0600080516020611c8e83398151915281565b34801561040857600080fd5b506101a96104173660046117d4565b6109b0565b34801561042857600080fd5b506101e0600081565b34801561043d57600080fd5b506101e07ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f78381565b34801561047157600080fd5b506101e0610480366004611662565b6109d9565b34801561049157600080fd5b506102806104a036600461140f565b63bc197c8160e01b95945050505050565b3480156104bd57600080fd5b506101876104cc3660046117bb565b610a1e565b3480156104dd57600080fd5b506101e06104ec3660046117bb565b60009081526001602052604090205490565b34801561050a57600080fd5b506101876105193660046117d4565b610af3565b61018761052c366004611662565b610b18565b34801561053d57600080fd5b5061028061054c36600461151f565b63f23a6e6160e01b95945050505050565b34801561056957600080fd5b506002546101e0565b600080516020611c8e83398151915261058a81610c90565b600061059a898989898989610831565b90506105a68184610c9d565b6000817f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8b8b8b8b8b8a6040516105e296959493929190611994565b60405180910390a3505050505050505050565b60006001600160e01b03198216630271189760e51b148061061a575061061a82610d8c565b92915050565b600080516020611cae83398151915261063a8160006109b0565b610648576106488133610dc1565b6000610658888888888888610831565b90506106648185610e1a565b61067088888888610eb6565b6000817fc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b588a8a8a8a6040516106a89493929190611962565b60405180910390a36106b981610f89565b5050505050505050565b6000818152600160205260408120546001811180156106e25750428111155b9392505050565b60008281526020819052604090206001015461070481610c90565b61070e8383610fc2565b505050565b60008181526001602052604081205481905b1192915050565b6001600160a01b03811633146107a15760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6107ab8282611046565b5050565b6000818152600160208190526040822054610725565b7f5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca56107ef81610c90565b60025460408051918252602082018490527f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5910160405180910390a150600255565b600086868686868660405160200161084e96959493929190611994565b6040516020818303038152906040528051906020012090509695505050505050565b600080516020611c8e83398151915261088881610c90565b8887146108a75760405162461bcd60e51b815260040161079890611aaf565b8885146108c65760405162461bcd60e51b815260040161079890611aaf565b60006108d88b8b8b8b8b8b8b8b6109d9565b90506108e48184610c9d565b60005b8a8110156109a25780827f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8e8e8581811061092457610924611c61565b905060200201602081019061093991906113f4565b8d8d8681811061094b5761094b611c61565b905060200201358c8c8781811061096457610964611c61565b90506020028101906109769190611b3c565b8c8b60405161098a96959493929190611994565b60405180910390a361099b81611c30565b90506108e7565b505050505050505050505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b600088888888888888886040516020016109fa9897969594939291906119d1565b60405160208183030381529060405280519060200120905098975050505050505050565b7ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783610a4881610c90565b610a51826107af565b610ab75760405162461bcd60e51b815260206004820152603160248201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e2063616044820152701b9b9bdd0818994818d85b98d95b1b1959607a1b6064820152608401610798565b6000828152600160205260408082208290555183917fbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb7091a25050565b600082815260208190526040902060010154610b0e81610c90565b61070e8383611046565b600080516020611cae833981519152610b328160006109b0565b610b4057610b408133610dc1565b878614610b5f5760405162461bcd60e51b815260040161079890611aaf565b878414610b7e5760405162461bcd60e51b815260040161079890611aaf565b6000610b908a8a8a8a8a8a8a8a6109d9565b9050610b9c8185610e1a565b60005b89811015610c7a5760008b8b83818110610bbb57610bbb611c61565b9050602002016020810190610bd091906113f4565b905060008a8a84818110610be657610be6611c61565b9050602002013590503660008a8a86818110610c0457610c04611c61565b9050602002810190610c169190611b3c565b91509150610c2684848484610eb6565b84867fc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b5886868686604051610c5d9493929190611962565b60405180910390a35050505080610c7390611c30565b9050610b9f565b50610c8481610f89565b50505050505050505050565b610c9a8133610dc1565b50565b610ca682610713565b15610d0b5760405162461bcd60e51b815260206004820152602f60248201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e20616c60448201526e1c9958591e481cd8da19591d5b1959608a1b6064820152608401610798565b600254811015610d6c5760405162461bcd60e51b815260206004820152602660248201527f54696d656c6f636b436f6e74726f6c6c65723a20696e73756666696369656e746044820152652064656c617960d01b6064820152608401610798565b610d768142611bb2565b6000928352600160205260409092209190915550565b60006001600160e01b03198216637965db0b60e01b148061061a57506301ffc9a760e01b6001600160e01b031983161461061a565b610dcb82826109b0565b6107ab57610dd8816110ab565b610de38360206110bd565b604051602001610df49291906118f3565b60408051601f198184030181529082905262461bcd60e51b825261079891600401611a7c565b610e23826106c3565b610e3f5760405162461bcd60e51b815260040161079890611af2565b801580610e5b5750600081815260016020819052604090912054145b6107ab5760405162461bcd60e51b815260206004820152602660248201527f54696d656c6f636b436f6e74726f6c6c65723a206d697373696e6720646570656044820152656e64656e637960d01b6064820152608401610798565b6000846001600160a01b0316848484604051610ed39291906118e3565b60006040518083038185875af1925050503d8060008114610f10576040519150601f19603f3d011682016040523d82523d6000602084013e610f15565b606091505b5050905080610f825760405162461bcd60e51b815260206004820152603360248201527f54696d656c6f636b436f6e74726f6c6c65723a20756e6465726c79696e6720746044820152721c985b9cd858dd1a5bdb881c995d995c9d1959606a1b6064820152608401610798565b5050505050565b610f92816106c3565b610fae5760405162461bcd60e51b815260040161079890611af2565b600090815260016020819052604090912055565b610fcc82826109b0565b6107ab576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556110023390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61105082826109b0565b156107ab576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b606061061a6001600160a01b03831660145b606060006110cc836002611bca565b6110d7906002611bb2565b6001600160401b038111156110ee576110ee611c77565b6040519080825280601f01601f191660200182016040528015611118576020820181803683370190505b509050600360fc1b8160008151811061113357611133611c61565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061116257611162611c61565b60200101906001600160f81b031916908160001a9053506000611186846002611bca565b611191906001611bb2565b90505b6001811115611209576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106111c5576111c5611c61565b1a60f81b8282815181106111db576111db611c61565b60200101906001600160f81b031916908160001a90535060049490941c9361120281611c19565b9050611194565b5083156106e25760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610798565b80356001600160a01b038116811461126f57600080fd5b919050565b60008083601f84011261128657600080fd5b5081356001600160401b0381111561129d57600080fd5b6020830191508360208260051b85010111156112b857600080fd5b9250929050565b600082601f8301126112d057600080fd5b813560206001600160401b038211156112eb576112eb611c77565b8160051b6112fa828201611b82565b83815282810190868401838801850189101561131557600080fd5b600093505b8584101561133857803583526001939093019291840191840161131a565b50979650505050505050565b60008083601f84011261135657600080fd5b5081356001600160401b0381111561136d57600080fd5b6020830191508360208285010111156112b857600080fd5b600082601f83011261139657600080fd5b81356001600160401b038111156113af576113af611c77565b6113c2601f8201601f1916602001611b82565b8181528460208386010111156113d757600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561140657600080fd5b6106e282611258565b600080600080600060a0868803121561142757600080fd5b61143086611258565b945061143e60208701611258565b935060408601356001600160401b038082111561145a57600080fd5b61146689838a016112bf565b9450606088013591508082111561147c57600080fd5b61148889838a016112bf565b9350608088013591508082111561149e57600080fd5b506114ab88828901611385565b9150509295509295909350565b600080600080608085870312156114ce57600080fd5b6114d785611258565b93506114e560208601611258565b92506040850135915060608501356001600160401b0381111561150757600080fd5b61151387828801611385565b91505092959194509250565b600080600080600060a0868803121561153757600080fd5b61154086611258565b945061154e60208701611258565b9350604086013592506060860135915060808601356001600160401b0381111561157757600080fd5b6114ab88828901611385565b60008060008060008060a0878903121561159c57600080fd5b6115a587611258565b95506020870135945060408701356001600160401b038111156115c757600080fd5b6115d389828a01611344565b979a9699509760608101359660809091013595509350505050565b600080600080600080600060c0888a03121561160957600080fd5b61161288611258565b96506020880135955060408801356001600160401b0381111561163457600080fd5b6116408a828b01611344565b989b979a50986060810135976080820135975060a09091013595509350505050565b60008060008060008060008060a0898b03121561167e57600080fd5b88356001600160401b038082111561169557600080fd5b6116a18c838d01611274565b909a50985060208b01359150808211156116ba57600080fd5b6116c68c838d01611274565b909850965060408b01359150808211156116df57600080fd5b506116ec8b828c01611274565b999c989b509699959896976060870135966080013595509350505050565b600080600080600080600080600060c08a8c03121561172857600080fd5b89356001600160401b038082111561173f57600080fd5b61174b8d838e01611274565b909b50995060208c013591508082111561176457600080fd5b6117708d838e01611274565b909950975060408c013591508082111561178957600080fd5b506117968c828d01611274565b9a9d999c50979a969997986060880135976080810135975060a0013595509350505050565b6000602082840312156117cd57600080fd5b5035919050565b600080604083850312156117e757600080fd5b823591506117f760208401611258565b90509250929050565b60006020828403121561181257600080fd5b81356001600160e01b0319811681146106e257600080fd5b81835260006020808501808196508560051b810191508460005b878110156118ad5782840389528135601e1988360301811261186557600080fd5b870180356001600160401b0381111561187d57600080fd5b80360389131561188c57600080fd5b61189986828985016118ba565b9a87019a9550505090840190600101611844565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b8183823760009101908152919050565b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b815260008351611925816017850160208801611be9565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611956816028840160208801611be9565b01602801949350505050565b60018060a01b038516815283602082015260606040820152600061198a6060830184866118ba565b9695505050505050565b60018060a01b038716815285602082015260a0604082015260006119bc60a0830186886118ba565b60608301949094525060800152949350505050565b60a0808252810188905260008960c08301825b8b811015611a12576001600160a01b036119fd84611258565b168252602092830192909101906001016119e4565b5083810360208501528881526001600160fb1b03891115611a3257600080fd5b8860051b9150818a602083013781810191505060208101600081526020848303016040850152611a6381888a61182a565b6060850196909652505050608001529695505050505050565b6020815260008251806020840152611a9b816040850160208701611be9565b601f01601f19169190910160400192915050565b60208082526023908201527f54696d656c6f636b436f6e74726f6c6c65723a206c656e677468206d69736d616040820152620e8c6d60eb1b606082015260800190565b6020808252602a908201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e206973604082015269206e6f7420726561647960b01b606082015260800190565b6000808335601e19843603018112611b5357600080fd5b8301803591506001600160401b03821115611b6d57600080fd5b6020019150368190038213156112b857600080fd5b604051601f8201601f191681016001600160401b0381118282101715611baa57611baa611c77565b604052919050565b60008219821115611bc557611bc5611c4b565b500190565b6000816000190483118215151615611be457611be4611c4b565b500290565b60005b83811015611c04578181015183820152602001611bec565b83811115611c13576000848401525b50505050565b600081611c2857611c28611c4b565b506000190190565b6000600019821415611c4457611c44611c4b565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfeb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1d8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63a26469706673582212203bbad03f073475433fada395d3c64a3071ef5e04f880f9e36b1ea130a5f43de864736f6c634300080700335f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5b09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1d8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63fd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783";

export class TimelockController__factory extends ContractFactory {
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
    minDelay: BigNumberish,
    proposers: string[],
    executors: string[],
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TimelockController> {
    return super.deploy(
      minDelay,
      proposers,
      executors,
      admin,
      overrides || {}
    ) as Promise<TimelockController>;
  }
  getDeployTransaction(
    minDelay: BigNumberish,
    proposers: string[],
    executors: string[],
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      minDelay,
      proposers,
      executors,
      admin,
      overrides || {}
    );
  }
  attach(address: string): TimelockController {
    return super.attach(address) as TimelockController;
  }
  connect(signer: Signer): TimelockController__factory {
    return super.connect(signer) as TimelockController__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TimelockControllerInterface {
    return new utils.Interface(_abi) as TimelockControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TimelockController {
    return new Contract(address, _abi, signerOrProvider) as TimelockController;
  }
}