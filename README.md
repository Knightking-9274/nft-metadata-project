Step 1: Creating NFT Smart Contract.

// SPDX-License-Identifier: MIT pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; import "@openzeppelin/contracts/access/Ownable.sol";

contract QuickNodeNFT is ERC721URIStorage, Ownable { constructor() ERC721("QuickNode NFT", "QN") Ownable(msg.sender) { // The owner is set to the deployer's address }

function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _uri);
}
} Step 2:Uploading the Images to IPFS. Also uploading JSON file to IPFS.

Step 3:Taking CID from IPFS and minting the NFT.

Step 4: Installing required dependencies for setting up the Node.js, Mongoose and Express server.(web3, mongoose, dotenv, node-fetch etc.)

Step 5: Setting up the Alchemy by connecting the wallet. (I have used sepolia testnet).

Step 6: Running the server and retrieving the metadata.

I have directly passed the contract address and token ID directly into the URL.

contract address - 0xD0565804F83793452DB5387a79c826B9891d9cE3 tokenID:112

//http://localhost:{PORT}/nft/metadata/{contract_address}/tokenID

Output : Retreived Metadata on the browser:

{ "contractAddress": "0xD0565804F83793452DB5387a79c826B9891d9cE3", "tokenId": "112", "name": "My Scorpion NFT", "description": "Deadliest scorpion", "imageUrl": "ipfs://QmNtXsDkh4h8W86pba8LVrZ78AZNPWRAfASUgiSgCmWCew", "_id": "671e134e1041301bdfb3ea25", "__v": 0 }
