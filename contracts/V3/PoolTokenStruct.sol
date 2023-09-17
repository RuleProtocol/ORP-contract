//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

struct TokenInfo {
    uint8 erc;
    address token;
    string logo;
}

struct AllocationParams {
    address token;
    uint tokenId;
    uint16 allocationId;
    uint8 allocationType;
    uint8 optType;
    uint amount;
    IdAmount[] ids;
    string name;
    string description;
}

// 20、1155
struct AmountAllocation {
    uint16 id;
    uint8 typ;
    string name;
    string description;
    uint balance;
    uint initialSupply;
    uint increasedSupply;
    uint burned;
    uint released;
}

// 721
struct IdAllocation {
    uint16 id;
    uint8 typ;
    string name;
    string description;
    EnumerableSet.UintSet ids;
    uint[] sortedIds;
    mapping(uint => uint) idAmount;
    IdAmount[] initialIds;
    IdAmount[] increasedIds;

    EnumerableSet.UintSet burnedIds;
    EnumerableSet.UintSet releasedIds;
}

struct IdAmount {
    uint id;
    uint amount;
}

// 721
struct IdAllocationView {
    uint id;
    uint8 typ;
    string name;
    string description;
    uint[] ids;
    IdAmount[] initialIds;
    IdAmount[] increasedIds;

    uint[] burnedIds;
    uint[] releasedIds;
}
