// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./comman/FERC721URIStorage.sol";

contract Trustified is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _eventIdCounter;

    mapping(uint256 => uint256[]) public tokenIds;

    event TokenMinted(address, uint256);
    event TokenTransfered(address, address, uint256);

    constructor() ERC721("Trustified", "TFN") {}

    function safeMint(string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(address(this), tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    function bulkMintERC721(string[] memory tokenUris) public {
        uint256 eventId = _eventIdCounter.current();
        _eventIdCounter.increment();
        for (uint256 i = 0; i < tokenUris.length; i++) {
            uint256 tokenId = safeMint(tokenUris[i]);
            tokenIds[eventId].push(tokenId);
        }
        emit TokenMinted(msg.sender, eventId);
    }

    function getTokenIds(uint256 eventId)
        public
        view
        returns (uint256[] memory)
    {
        return tokenIds[eventId];
    }

    function transferToken(address to, uint256 tokenId) public {
        IERC721(address(this)).transferFrom(address(this), to, tokenId);
        emit TokenTransfered(address(this), to, tokenId);
    }
}
