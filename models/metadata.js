const mongoose = require('mongoose');

const metaDataSchema = new mongoose.Schema({
    contractAddress: { type: String, required: true },
    tokenId: { type: String, required: true },
    name: String,
    description: String,
    imageUrl: String,
});

module.exports = mongoose.model('Metadata', metaDataSchema);