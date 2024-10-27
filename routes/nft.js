// routes/nft.js
const express = require('express');
const { getNFTMetadata, getAllTokenIds } = require('../services/nftService');
const router = express.Router();

// Endpoint to get metadata for a specific token ID
// Token ID will be passed in the URL itself
router.get('/metadata/:contractAddress/:tokenId', async (req, res) => {
    const { contractAddress, tokenId } = req.params;

    // Validate input parameters
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
        return res.status(400).json({ error: 'Invalid contract address format' });
    }
    if (!/^\d+$/.test(tokenId)) {
        return res.status(400).json({ error: 'Token ID must be a positive integer' });
    }

    try {
        const metadata = await getNFTMetadata(contractAddress, tokenId);

        // Check if metadata was successfully retrieved
        if (!metadata) {
            return res.status(404).json({ error: 'Metadata not found for this token' });
        }

        res.json(metadata);
    } catch (error) {
        console.error("Error fetching NFT metadata:", error); // Logging error for debugging
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get all token IDs for a specific owner and their metadata
router.get('/tokens/:contractAddress/:ownerAddress', async (req, res) => {
    const { contractAddress, ownerAddress } = req.params;

    // Validate input parameters
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
        return res.status(400).json({ error: 'Invalid contract address format' });
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(ownerAddress)) {
        return res.status(400).json({ error: 'Invalid owner address format' });
    }

    try {
        const tokenIds = await getAllTokenIds(contractAddress, ownerAddress);

        // Check if token IDs were successfully retrieved
        if (!tokenIds || tokenIds.length === 0) {
            return res.status(404).json({ error: 'No tokens found for this owner' });
        }

        res.json(tokenIds);
    } catch (error) {
        console.error("Error fetching token IDs:", error); // Log error for debugging
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
