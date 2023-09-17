// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "../interface/IPoolToken.sol";
import "../interface/IERCMintBurnClaimRole.sol";
import "../struct/Token.sol";
import "../struct/Constant.sol";
import "hardhat/console.sol";

library Transfer {

    error TransferError(address from, address to, address token, uint16 allocationId, uint256 id, uint256 amount, uint8 erc);
    error MintError(address to, address token, uint16 allocationId, uint256 id, uint256 amount, uint8 erc);

    ///
    /// ============ transfer ============
    ///
    function transfer(address from, address to, uint8 erc, address token, uint256 id, uint256 amount) public {
        if (erc == TOKEN_ERC_COIN) {
            //id = 0 , transfer from address(this)
            //id = 1 , transfer from 'from'

            console.log("---------------------------- lib transfer COIN id", id);
            console.log("---------------------------- lib transfer COIN from", from);
            console.log("---------------------------- lib transfer COIN to", to);
            console.log("---------------------------- lib transfer COIN amount", amount);
            if (id == 0) {
                Address.sendValue(payable(to), amount);
            } else {
                IPoolToken(payable(from)).CoinTransfer(0, to, amount);
            }
        } else if (erc == TOKEN_ERC_ERC20) {
            console.log("---------------------------- lib transfer ERC20 token", token);
            console.log("---------------------------- lib transfer ERC20 from", from);
            console.log("---------------------------- lib transfer ERC20 to", to);
            console.log("---------------------------- lib transfer ERC20 amount", amount);
            try IERC20(token).transferFrom(from, to, amount) returns (bool success) {
                if (!success) {
                    revert TransferError(from, to, token, 0, id, amount, erc);
                }
            } catch {
                revert TransferError(from, to, token, 0, id, amount, erc);
            }
        } else if (erc == TOKEN_ERC_ERC721) {
            console.log("---------------------------- lib transfer ERC721 token", token);
            console.log("---------------------------- lib transfer ERC721 from", from);
            console.log("---------------------------- lib transfer ERC721 to", to);
            console.log("---------------------------- lib transfer ERC721 id", id);
            try IERC721(token).transferFrom(from, to, id) {
            } catch {
                revert TransferError(from, to, token, 0, id, amount, erc);
            }
        } else if (erc == TOKEN_ERC_ERC1155) {
            console.log("---------------------------- lib transfer ERC1155 token", token);
            console.log("---------------------------- lib transfer ERC1155 from", from);
            console.log("---------------------------- lib transfer ERC1155 to", to);
            console.log("---------------------------- lib transfer ERC1155 id", id);
            console.log("---------------------------- lib transfer ERC1155 amount", amount);
            try IERC1155(token).safeTransferFrom(from, to, id, amount, new bytes(0)) {
            } catch {
                revert TransferError(from, to, token, 0, id, amount, erc);
            }
        }
    }

    ///
    /// ============ mint ============
    ///
    function mint(address to, uint8 erc, address token, uint256 id, uint256 amount, bytes memory data) public returns (uint256){
        if (erc == TOKEN_ERC_ERC20) {
            console.log("---------------------------- lib mint ERC20 token", token);
            console.log("---------------------------- lib mint ERC20 to", to);
            console.log("---------------------------- lib mint ERC20 amount", amount);
            try IERCMintBurnClaimRole(token).mint(to, amount) {
            } catch {
                revert MintError(to, token, 0, id, amount, erc);
            }
        } else if (erc == TOKEN_ERC_ERC721) {
            //amount prior to id > 0
            if (amount > 0) {
                console.log("---------------------------- lib mint ERC721 id(useless)", id);

                console.log("---------------------------- lib mint ERC721 token", token);
                console.log("---------------------------- lib mint ERC721 mintBatch to", to);
                console.log("---------------------------- lib mint ERC721 mintBatch amount", amount);
                try IERCMintBurnClaimRole(token).mintBatch(to, amount) {
                } catch {
                    revert MintError(to, token, 0, id, amount, erc);
                }
            } else if (id > 0 && amount == 0) {
                console.log("---------------------------- lib mint ERC721 token", token);
                console.log("---------------------------- lib mint ERC721 claim to", to);
                console.log("---------------------------- lib mint ERC721 claim id", id);
                try IERCMintBurnClaimRole(token).claim(id, to) {
                } catch {
                    revert MintError(to, token, 0, id, amount, erc);
                }
            } else if (id == 0) {
                console.log("---------------------------- lib mint ERC721 token", token);
                console.log("---------------------------- lib mint ERC721 mint increment to", to);
                try IERCMintBurnClaimRole(token).mint(to) returns (uint id) {
                    console.log("---------------------------- lib mint ERC721 mint id", id);
                } catch {
                    revert MintError(to, token, 0, id, amount, erc);
                }
            }
        } else if (erc == TOKEN_ERC_ERC1155) {
            // IERCMintBurnClaim(token).mint( to, id, amount, new bytes(0) );
            console.log("---------------------------- lib mint ERC1155 token", token);
            console.log("---------------------------- lib mint ERC1155 mint to", to);
            console.log("---------------------------- lib mint ERC1155 mint id", id);
            console.log("---------------------------- lib mint ERC1155 mint amount", amount);
            try IERCMintBurnClaimRole(token).mint(to, id, amount, data) {
            } catch {
                revert MintError(to, token, 0, id, amount, erc);
            }
        }
        return id;
    }

    ///
    /// ============ transferFromPoolToken ============
    ///
    function transferFromPoolToken(address poolToken, uint16 allocationId, address to, uint8 erc, address token, uint256 id, uint256 amount) public {
        if (erc == TOKEN_ERC_COIN) {
            console.log("---------------------------- lib transferFromPoolToken COIN poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
            console.log("---------------------------- lib transferFromPoolToken COIN to:%s, amount:%s", to, amount);
            try IPoolToken(payable(poolToken)).CoinTransfer(0, to, amount) {
            } catch {
                revert TransferError(poolToken, to, token, 0, id, amount, erc);
            }
        } else if (erc == TOKEN_ERC_ERC20) {
            console.log("---------------------------- lib transferFromPoolToken ERC20 poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
            console.log("---------------------------- lib transferFromPoolToken ERC20 to:%s, amount:%s", to, amount);
            try IPoolToken(payable(poolToken)).ERC20Transfer(token, allocationId, to, amount) {
            } catch {
                revert TransferError(poolToken, to, token, 0, id, amount, erc);
            }
        } else if (erc == TOKEN_ERC_ERC721) {
            console.log("---------------------------- lib transferFromPoolToken ERC721 poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
            console.log("---------------------------- lib transferFromPoolToken ERC721 to:%s, id:%s", to, id);
            try IPoolToken(payable(poolToken)).ERC721Transfer(token, allocationId, to, id) {
            } catch {
                revert TransferError(poolToken, to, token, 0, id, amount, erc);
            }
        } else if (erc == TOKEN_ERC_ERC1155) {
            console.log("---------------------------- lib transferFromPoolToken ERC1155 poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
            console.log("---------------------------- lib transferFromPoolToken ERC1155 to:%s, id:%s, amount:%s", to, id, amount);
            try IPoolToken(payable(poolToken)).ERC1155SafeTransferFrom(token, allocationId, to, id, amount, new bytes(0)) {
            } catch {
                revert TransferError(poolToken, to, token, 0, id, amount, erc);
            }
        }
    }

    ///
    /// ============ mintFromPoolToken ============
    ///
    function mintFromPoolToken(address poolToken, uint16 allocationId, address to, uint8 erc, address token, uint256 id, uint256 amount, bytes memory data) public returns (uint256){
        uint tokenId = id;
        if (erc == TOKEN_ERC_ERC20) {
            console.log("---------------------------- lib mintFromPoolToken ERC20 poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
            console.log("---------------------------- lib mintFromPoolToken ERC20 to:%s, amount:%s", to, amount);
            try IPoolToken(payable(poolToken)).ERC20Mint(token, allocationId, to, amount) {
            } catch {
                revert MintError(to, token, 0, id, amount, erc);
            }
        } else if (erc == TOKEN_ERC_ERC721) {
            //amount prior to id > 0
            if (amount > 0) {
                console.log("---------------------------- lib mintFromPoolToken ERC721 poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
                console.log("---------------------------- lib mintFromPoolToken ERC721 mintBatch to:%s, amount:%s", to, amount);
                console.log("---------------------------- lib mintFromPoolToken ERC721 id(useless)", id);
                try IPoolToken(payable(poolToken)).ERC721MintBatch(token, allocationId, to, amount) {
                } catch {
                    revert MintError(to, token, 0, id, amount, erc);
                }
            } else if (id > 0 && amount == 0) {
                console.log("---------------------------- lib mintFromPoolToken ERC721 poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
                console.log("---------------------------- lib mintFromPoolToken ERC721 claim to:%s, id:%s", to, id);
                try IPoolToken(payable(poolToken)).ERC721Claim(token, allocationId, id, to) {
                } catch {
                    revert MintError(to, token, 0, id, amount, erc);
                }
            } else if (id == 0) {
                console.log("---------------------------- lib mintFromPoolToken ERC721 token", token);
                console.log("---------------------------- lib mintFromPoolToken ERC721 mint increment to", to);
                try IPoolToken(payable(poolToken)).ERC721Mint(token, allocationId, to) returns (uint id) {
                    console.log("---------------------------- lib mintFromPoolToken ERC721 mint id", id);
                    tokenId = id;
                } catch {
                    revert MintError(to, token, 0, id, amount, erc);
                }
            }
        } else if (erc == TOKEN_ERC_ERC1155) {
            console.log("---------------------------- lib mintFromPoolToken ERC1155 poolToken:%s, token:%s, allocationId:%s", poolToken, token, allocationId);
            console.log("---------------------------- lib mintFromPoolToken ERC1155 to:%s, id:%s, amount:%s", to, id, amount);
            try IPoolToken(payable(poolToken)).ERC1155Mint(token, allocationId, to, id, amount, data) {
            } catch {
                revert MintError(to, token, 0, id, amount, erc);
            }
        }

        console.log("---------------------------- lib mintFromPoolToken tokenId", tokenId);
        return tokenId;
    }

    function checkBalance(address from, uint8 erc, address token, uint256 id, uint256 amount) public {
        if (erc == TOKEN_ERC_COIN) {
            console.log("---------------------------- lib balance COIN id:%s, from:%s, amount:%s", id, from, amount);
            require(from.balance >= amount, "COIN balance check exist fail");
            Address.sendValue(payable(from), amount);
        } else if (erc == TOKEN_ERC_ERC20) {
            console.log("---------------------------- lib balance ERC20 token:%s, from:%s, amount:%s", token, from, amount);
            require(IERC20(token).balanceOf(from) >= amount, "ERC20 balance check exist fail");
        } else if (erc == TOKEN_ERC_ERC721) {
            console.log("---------------------------- lib balance ERC721 token:%s, from:%s, id:%s", token, from, id);
            require(IERC721(token).ownerOf(id) == from, "ERC721 id check exist fail");
        } else if (erc == TOKEN_ERC_ERC1155) {
            console.log("---------------------------- lib balance ERC1155 token:%s, from:%s", token, from);
            console.log("---------------------------- lib balance ERC1155 id:%s, amount:%s", id, amount);
            require(IERC1155(token).balanceOf(from, id) >= amount, "ERC1155 id.balance check exist fail");
        }
    }

}
