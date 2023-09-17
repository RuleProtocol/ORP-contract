// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @dev {ERC1155} token
 */
contract ERC1155MinterSupplyCap is
    Context,
    AccessControlEnumerable,
    ERC1155Supply
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    mapping(uint256 => uint256) public cap;
    string private _uri;

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` to the account that
     * deploys the contract.
     */
    constructor(string memory uri, address minterAddress) ERC1155(uri) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, minterAddress);
        _uri = uri;
    }

    function addCap(uint256 tokenId, uint256 _cap) public {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC1155MinterSupply: must have minter role to mint"
        );

        if(_cap == 0){
            cap[tokenId] = 0;
        } else {
            cap[tokenId] += _cap;
        }
    }

    function addCapBatch(uint256[] memory ids, uint256[] memory caps) public {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC1155MinterSupply: must have minter role to mint"
        );
        for (uint256 i; i < ids.length; i++) {
            cap[ids[i]] += caps[i];
        }
    }

    /**
     * @dev Creates `amount` new tokens for `to`, of token type `id`.
     *
     * See {ERC1155-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC1155MinterSupply: must have minter role to mint"
        );

        _mint(to, id, amount, data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] variant of {mint}.
     */
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC1155MinterSupply: must have minter role to mint"
        );

        _mintBatch(to, ids, amounts, data);
    }

    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );

        _burn(account, id, value);
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );

        _burnBatch(account, ids, values);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override { //(ERC1155)
        if (from == address(0)) {
            for (uint256 i; i < ids.length; i++) {

                if(cap[ids[i]] > 0){
                    require(
                        totalSupply(ids[i]) + amounts[i] <= cap[ids[i]],
                        "ERC1155MinterSupply: cap!"
                    );
                }
            }
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        require(exists(tokenId), "ERC1155Metadata: URI query for nonexistent token");
        return bytes(_uri).length > 0 ? string(abi.encodePacked(_uri, Strings.toString(tokenId))) : "";
    }

}
