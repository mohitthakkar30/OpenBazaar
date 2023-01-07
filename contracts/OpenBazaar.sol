//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract OpenBazaar is ERC1155Holder, ERC1155URIStorage {
    address payable owner;

    constructor() ERC1155("") {
        owner = payable(msg.sender);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    struct digitalAsset {
        uint256 tokenId;
        address payable owner;
        address payable creator;
        uint256 price;
        uint256 supply;
        uint256 supplyleft;
    }

    event digitalAssetFormed(
        uint256 indexed tokenId,
        address owner,
        address creator,
        uint256 price,
        uint256 supply,
        uint256 supplyleft
    );

    mapping(uint256 => digitalAsset) idtoDigitalAsset;

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function createAsset(
        string memory tokenURI,
        uint256 supply,
        uint256 price
    ) public payable {
        _tokenId.increment();
        uint256 currentToken = _tokenId.current();
        _mint(msg.sender, currentToken, supply, "");
        _setURI(currentToken, tokenURI);
        createDigitalAsset(currentToken, supply, price);
    }

    function createDigitalAsset(
        uint256 tokenId,
        uint256 supply,
        uint256 price
    ) private {
        idtoDigitalAsset[tokenId] = digitalAsset(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            supply,
            supply
        );

        _safeTransferFrom(msg.sender, address(this), tokenId, supply, "");

        emit digitalAssetFormed(
            tokenId,
            address(this),
            msg.sender,
            price,
            supply,
            supply
        );
    }

    function buyDigitalAsset(uint256 tokenId) public payable {
        uint256 price = idtoDigitalAsset[tokenId].price;
        require(msg.value == price);
        require(idtoDigitalAsset[tokenId].supplyleft >= idtoDigitalAsset[tokenId].supply);
        idtoDigitalAsset[tokenId].owner = payable(msg.sender);
        idtoDigitalAsset[tokenId].supplyleft--;

        _safeTransferFrom(address(this), msg.sender, tokenId, 1, "");

        uint256 fee = price/100;
        uint256 remaining = price - fee;

        payable(idtoDigitalAsset[tokenId].creator).transfer(remaining);
        payable(owner).transfer(fee);
    }

    function getStore() public view returns (digitalAsset[] memory) {
        uint counter = 0;
        uint length;

        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idtoDigitalAsset[i+1].supplyleft > 0) {
                length++;
            }
        }

        digitalAsset[] memory unsoldDigitalAssets = new digitalAsset[](length);
        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idtoDigitalAsset[i+1].supplyleft > 0) {
                uint currentId = i+1;
                digitalAsset storage currentItem = idtoDigitalAsset[currentId];
                unsoldDigitalAssets[counter] = currentItem;
                counter++;
            }
        }
        return unsoldDigitalAssets;
    }

    function getInventory() public view returns (digitalAsset[] memory) {
            uint counter = 0;
            uint length ;

            for (uint i = 0; i < _tokenId.current(); i++) {
                if (idtoDigitalAsset[i+1].owner == msg.sender) {
                    length++;
                }
            }

            digitalAsset[] memory myBooks = new digitalAsset[](length);
            for (uint i = 0; i < _tokenId.current(); i++) {
                if (idtoDigitalAsset[i+1].owner == msg.sender) {
                    uint currentId = i+1;
                    digitalAsset storage currentItem = idtoDigitalAsset[currentId];
                    myBooks[counter] = currentItem;
                    counter++;
                }
            }
            return myBooks;
    }

    function getListings() public view returns (digitalAsset[] memory) {
        uint counter = 0;
        uint length;

        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idtoDigitalAsset[i+1].creator == msg.sender) {
                length++;
            }
        }
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract OpenBazaar is ERC1155Holder, ERC1155URIStorage {
    address payable owner;

    constructor() ERC1155("") {
        owner = payable(msg.sender);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    struct digitalAsset {
        uint256 tokenId;
        address payable owner;
        address payable creator;
        uint256 price;
        uint256 supply;
        uint256 supplyleft;
    }

    event digitalAssetFormed(
        uint256 indexed tokenId,
        address owner,
        address creator,
        uint256 price,
        uint256 supply,
        uint256 supplyleft
    );

    mapping(uint256 => digitalAsset) idtoDigitalAsset;

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function createAsset(
        string memory tokenURI,
        uint256 supply,
        uint256 price
    ) public payable {
        _tokenId.increment();
        uint256 currentToken = _tokenId.current();
        _mint(msg.sender, currentToken, supply, "");
        _setURI(currentToken, tokenURI);
        createDigitalAsset(currentToken, supply, price);
    }

    function createDigitalAsset(
        uint256 tokenId,
        uint256 supply,
        uint256 price
    ) private {
        idtoDigitalAsset[tokenId] = digitalAsset(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            supply,
            supply
        );

        _safeTransferFrom(msg.sender, address(this), tokenId, supply, "");

        emit digitalAssetFormed(
            tokenId,
            address(this),
            msg.sender,
            price,
            supply,
            supply
        );
    }

    function buyDigitalAsset(uint256 tokenId) public payable {
        uint256 price = idtoDigitalAsset[tokenId].price;
        require(msg.value == price);
        require(idtoDigitalAsset[tokenId].supplyleft >= idtoDigitalAsset[tokenId].supply);
        idtoDigitalAsset[tokenId].owner = payable(msg.sender);
        idtoDigitalAsset[tokenId].supplyleft--;

        _safeTransferFrom(address(this), msg.sender, tokenId, 1, "");

        uint256 fee = price/100;
        uint256 remaining = price - fee;

        payable(idtoDigitalAsset[tokenId].creator).transfer(remaining);
        payable(owner).transfer(fee);
    }

    function getStore() public view returns (digitalAsset[] memory) {
        uint counter = 0;
        uint length;

        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idtoDigitalAsset[i+1].supplyleft > 0) {
                length++;
            }
        }

        digitalAsset[] memory unsoldDigitalAssets = new digitalAsset[](length);
        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idtoDigitalAsset[i+1].supplyleft > 0) {
                uint currentId = i+1;
                digitalAsset storage currentItem = idtoDigitalAsset[currentId];
                unsoldDigitalAssets[counter] = currentItem;
                counter++;
            }
        }
        return unsoldDigitalAssets;
    }

    function getInventory() public view returns (digitalAsset[] memory) {
            uint counter = 0;
            uint length ;

            for (uint i = 0; i < _tokenId.current(); i++) {
                if (idtoDigitalAsset[i+1].owner == msg.sender) {
                    length++;
                }
            }

            digitalAsset[] memory myBooks = new digitalAsset[](length);
            for (uint i = 0; i < _tokenId.current(); i++) {
                if (idtoDigitalAsset[i+1].owner == msg.sender) {
                    uint currentId = i+1;
                    digitalAsset storage currentItem = idtoDigitalAsset[currentId];
                    myBooks[counter] = currentItem;
                    counter++;
                }
            }
            return myBooks;
    }

    function getListings() public view returns (digitalAsset[] memory) {
        uint counter = 0;
        uint length;

        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idtoDigitalAsset[i+1].creator == msg.sender) {
                length++;
            }
        }

        digitalAsset[] memory listedDigitalAssets = new digitalAsset[](length);
        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idtoDigitalAsset[i+1].creator == msg.sender) {
                uint currentId = i+1;
                digitalAsset storage currentItem = idtoDigitalAsset[currentId];
                listedDigitalAssets[counter] = currentItem;
                counter++;
            }
        }
        return listedDigitalAssets;
    }

}

