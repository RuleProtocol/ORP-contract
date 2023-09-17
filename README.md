# Start

This document is an open source contract description of the ORP.



After downloading the code, execute the command and install the dependent packages

```
npm install
```



## Compile

To compile the contract, use the following command

```
npm run compile
```



# Run

In the node.js environment, execute the following command to run the use case.

```
ts-node ./test/governance/testGovernanceOpen.ts
```

The use case describes how to generate a proposal through qualified governance, vote on the proposal, and finally mint ERC20 from the token pool to the user specified in the proposal.



# Structure

The contract code is mainly divided into 3 parts.

### 1. Governance  Contracts

```
contracts/governance
```

### 2. Qualification Contracts

```
contracts/V3
```

### 3. Token Pool Contracts

```
contracts/V3/PoolToken
contracts/V3/PoolTokenAllocation
contracts/V3/PoolTokenStruct
```

