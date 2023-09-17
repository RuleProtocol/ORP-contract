pragma solidity ^0.8.0;


address constant ZERO_ADDRESS = address(0);
address constant MINT_DESTROY_ADDRESS = address(1);
address constant SELF_ADDRESS = address(2);

address constant DEAD_ADDRESS = address(0x000000000000000000000000000000000000dEaD);

uint constant UINT256_MAX = 2**256 - 1;
uint constant UINT256_18 = 10 ** 18;



// ============ roles ============
bytes32 constant CLUSTER_ROLE = keccak256("CLUSTER_ROLE");
bytes32 constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");
bytes32 constant MINTER_ROLE = keccak256("MINTER_ROLE");
bytes32 constant BURN_ROLE = keccak256("BURN_ROLE");
bytes32 constant APPROVE_ROLE = keccak256("APPROVE_ROLE");
bytes32 constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
bytes32 constant FUNCTION_ROLE = keccak256("FUNCTION_ROLE");

// ============ PoolToken ============
// roles
bytes32 constant ADD_TOKEN_ROLE = keccak256("ADD_TOKEN_ROLE");
bytes32 constant ALLOCATE_ROLE = keccak256("ALLOCATE_ROLE");
// allocation-type
uint8 constant AllocationTypeMint = 0;
uint8 constant AllocationTypeTransfer = 1;
// operation-type
uint8 constant OperationTypeEditInitial = 0;
uint8 constant OperationTypeIncreaseSupply = 1;
uint8 constant OperationTypeBurn = 2;
uint8 constant OperationTypeEditReleased = 3;
uint8 constant OperationTypeEditBurned = 4;

// ============ engine ============
uint8 constant TOKEN_ERC_COIN = 0;
uint8 constant TOKEN_ERC_ERC20 = 1;
uint8 constant TOKEN_ERC_ERC721 = 2;
uint8 constant TOKEN_ERC_ERC1155 = 3;

uint8 constant TOKEN_TEMPLATE_TYPE_ID_RANGE = 0;
uint8 constant TOKEN_TEMPLATE_TYPE_ID_LIST = 1;
uint8 constant TOKEN_TEMPLATE_TYPE_SWAP_V2 = 2;
uint8 constant TOKEN_TEMPLATE_ID_REQUIRED_FALSE = 0;//no need pass in
uint8 constant TOKEN_TEMPLATE_ID_REQUIRED_TRUE = 1;//must pass in
uint8 constant TOKEN_TEMPLATE_ID_REQUIRED_EXIST = 2;//must check if exist
uint8 constant TOKEN_TEMPLATE_ID_REQUIRED_NONE = 3;
uint8 constant TOKEN_TEMPLATE_ID_REQUIRED_MOUNTING = 4;

uint8 constant TOKEN_TEMPLATE_AMOUNT_REQUIRED_FALSE = 0;
uint8 constant TOKEN_TEMPLATE_AMOUNT_REQUIRED_TRUE = 1;
uint8 constant TOKEN_TEMPLATE_AMOUNT_REQUIRED_EXIST = 2;
uint8 constant TOKEN_TEMPLATE_AMOUNT_REQUIRED_NONE = 3;

uint8 constant TOKEN_TEMPLATE_AMOUNT_REQUIRED_MOUNTING = 4;

uint8 constant DURATION_TYPE_TIMESTAMP = 0;
uint8 constant DURATION_TYPE_BLOCK_NUMBER = 1;

