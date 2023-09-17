// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ArbSys {
    /**
    * @notice Get Arbitrum block number (distinct from L1 block number; Arbitrum genesis block has block number 0)
    * @return block number as int
     */
    function arbBlockNumber() external view returns (uint);
}

library Chain {
    function getBlockNumber() internal view returns (uint256) {
        uint256 chainId = block.chainid;
        if (chainId == 42161) {
            return ArbSys(address(100)).arbBlockNumber();
        }
        return block.number;
    }
}
