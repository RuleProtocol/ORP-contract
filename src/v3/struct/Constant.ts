// @ts-nocheck

import { BytesLike, utils } from "ethers";

export const SDK_CHECK = true;

export enum ERC {
  COIN,
  ERC20,
  ERC721,
  ERC1155
}

export enum TOKEN_TEMPLATE_TYPE {ID_RANGE = 0, ID_LIST = 1, SWAP_V2 = 2}
export enum TOKEN_TEMPLATE_ID_REQUIRED {FALSE = 0, TRUE = 1, EXIST = 2, NONE = 3, MOUNTING = 4}
export enum TOKEN_TEMPLATE_ID_FORMULA_REQUIRED {FALSE = 0, TRUE = 1}
export enum TOKEN_TEMPLATE_AMOUNT_REQUIRED {FALSE = 0, TRUE = 1, EXIST = 2, NONE = 3, MOUNTING = 4}
export enum TOKEN_TEMPLATE_AMOUNT_FORMULA_REQUIRED {FALSE = 0, TRUE = 1}
export enum TOKEN_TEMPLATE_ATTRIBUTE_REQUIRED {NONE = 0, EXIST = 1}
export enum TOKEN_TEMPLATE_OUT_ADDRESS_REQUIRED {FALSE = 0, TRUE = 1}

///
/// ============ pool-token ============
///
export const ADMIN_ROLE: BytesLike = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const MINTER_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("MINTER_ROLE"));
export const TRANSFER_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("TRANSFER_ROLE"));
export const BURN_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("BURN_ROLE"));
export const CLUSTER_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("CLUSTER_ROLE"));
export const APPROVE_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("APPROVE_ROLE"));
export const ADD_TOKEN_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("ADD_TOKEN_ROLE"));
export const ALLOCATE_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("ALLOCATE_ROLE"));
export const PAUSER_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("PAUSER_ROLE"));

export const PROPOSAL_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("PROPOSER_ROLE"));//"0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
export const EXECUTOR_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("EXECUTOR_ROLE"));//"0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
export const CANCEL_ROLE: BytesLike = utils.keccak256(utils.toUtf8Bytes("CANCELLER_ROLE"));

export const FULL_POOL_TOKEN_ROLES = [ADMIN_ROLE, MINTER_ROLE, TRANSFER_ROLE, BURN_ROLE, CLUSTER_ROLE, APPROVE_ROLE, ADD_TOKEN_ROLE, ALLOCATE_ROLE, PAUSER_ROLE];


export enum HANDLER_CMD{EXECUTE = 0,CLAIM = 1,WITHDRAW = 2,MAKE_RANDOM = 10,EXECUTE_100=100}
export enum HANDLER_CMD_EXECUTE_100{ON = 1,OFF = 0}

export enum HANDLER_STATE{DELETED = 0,WAITING = 1,IN_REVIEW = 2,ACCEPTED = 10,STANDALONE = 20}



export enum RULE {ALL,IN,OUT}
export enum IO {INPUT,OUTPUT}
export enum DURATION_TYPE {TIMESTAMP=0,BLOCK_NUMBER=1}
export enum CLUSTER_STATE {DISABLED,ENABLED,WAITING}
export enum RULE_STATE {DISABLED,ENABLED,WAITING,DISABLED_FOREVER =10,ENABLED_FOREVER =11,UPDATE = 100}
export enum APPROVE {NONE,ONCE,ALL}

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MINT_DESTROY_ADDRESS = "0x0000000000000000000000000000000000000001";
export const SELF_ADDRESS = "0x0000000000000000000000000000000000000002";

export const BYTES4 = "0x00000000";

export const BYTES0 = "0x";

export enum RULE_IO_TYPE {
  TRANSFER = 0,
  POOL_TOKEN_MINT_DESTROY = 1,
  POOL_TOKEN_TRANSFER = 2,
  POOL_TOKEN_MOUNT = 3,
  POOL_TOKEN_UNMOUNT = 4,
  NONE = 5,
}

export enum MSG_TYPE {NONE = 0, TOKEN = 1, IO_ADDRESS = 2, HANDLER, POOLTOKEN_INPUT}
export enum MSG_LEVEL {NORMAL = 0, WARNING = 1, ERROR = 2, REQUIRED}


export enum PROPOSAL_STATE {
  Pending,
  Activep,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed
}






