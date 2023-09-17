// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

/**
 * @dev {ERC721} token, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 *  - token ID and URI autogeneration
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter and pauser
 * roles, as well as the default admin role, which will let it grant both minter
 * and pauser roles to other accounts.
 */
contract ERC721MinterPauserAutoIdCap is
    Context,
    AccessControlEnumerable,
    ERC721Enumerable,
    ERC721Burnable,
    ERC721Pausable
{
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public cap;

    Counters.Counter private _tokenIdTracker;

    string private _baseTokenURI;

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
     * account that deploys the contract.
     *
     * Token URIs will be autogenerated based on `baseURI` and their token IDs.
     * See {ERC721-tokenURI}.
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        uint256 _cap,
        address minterAddress
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;

//        console.log("721 mintRole");
//        console.log(MINTER_ROLE);

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(DEFAULT_ADMIN_ROLE, minterAddress);

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());

        cap = _cap;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function addCap(uint256 _cap) public {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC721PresetMinterPauserAutoIdCap: must have minter role to mint"
        );

        if(_cap == 0){
            cap = 0;
        }
        else if(_cap > 0){
            cap += _cap;
        }
    }


    /**
     * @dev Creates a new token for `to`. Its token ID will be automatically
     * assigned (and available on the emitted {IERC721-Transfer} event), and the token
     * URI autogenerated based on the base URI passed at construction.
     *
     * See {ERC721-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to) public virtual returns (uint256){
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC721PresetMinterPauserAutoIdCap: must have minter role to mint"
        );

        while (true) {
            _tokenIdTracker.increment();
            if (cap > 0) {
                require(_tokenIdTracker.current() <= cap, "ERC721PresetMinterPauserAutoIdCap: Cap!");
            }
            if (!_exists(_tokenIdTracker.current())) {

                // We cannot just use balanceOf to create the new tokenId because tokens
                // can be burned (destroyed), so we need a split counter.
                _safeMint(to, _tokenIdTracker.current());

                console.log("----- ERC721MinterPauserAutoIdCap mint id", _tokenIdTracker.current());
                break;
            }
        }

        return _tokenIdTracker.current();
    }

    function mintBatch(address to, uint amount) public virtual returns (uint[] memory) {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoIdCap: must have minter role to mint");
        require(amount > 0, "ERC721PresetMinterPauserAutoIdCap: must amount > 0");

        uint[] memory ids = new uint[](amount);
        uint index = 0;
        while (true) {
            _tokenIdTracker.increment();
            if (cap > 0) {
                require(_tokenIdTracker.current() <= cap, "ERC721PresetMinterPauserAutoIdCap: Cap!");
            }
            if (!_exists(_tokenIdTracker.current())) {
                ids[index] = _tokenIdTracker.current();
                _safeMint(to, _tokenIdTracker.current());
                console.log("----- ERC721MinterPauserAutoIdCap mint id", _tokenIdTracker.current());

                index++;
                if (index == amount) {
                    break;
                }
            }
        }
        return ids;
    }

    function claim(uint256 tokenId, address to) public {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC721PresetMinterPauserAutoIdCap: must have minter role to mint"
        );
        if(cap > 0)
            require(tokenId <= cap, "ERC721PresetMinterPauserAutoIdCap: Cap!");
        _safeMint(to, tokenId);
    }


    function batchClaim(uint256[] memory tokenIds, address to) public {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC721PresetMinterPauserAutoIdCap: must have minter role to mint"
        );

        for(uint i; i < tokenIds.length; ++i){

            if(cap > 0)
                require(tokenIds[i] <= cap, "ERC721PresetMinterPauserAutoIdCap: Cap!");

            _safeMint(to, tokenIds[i]);
        }
    }



    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public virtual {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "ERC721PresetMinterPauserAutoIdCap: must have pauser role to pause"
        );
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public virtual {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "ERC721PresetMinterPauserAutoIdCap: must have pauser role to unpause"
        );
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function burnBatch(uint256[] memory ids) public virtual {
        for (uint i; i < ids.length; i++) {
            require(_isApprovedOrOwner(_msgSender(), ids[i]), "ERC721: caller is not token owner nor approved");
            _burn(ids[i]);
        }
    }
}
