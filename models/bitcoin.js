const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BitcoinModelSchema = new Schema({
    price: {
        type: Number
    },
    timestamp: {
    	type: Date,
    	default: Date.now
    }
});

// Compile model from schema
const BitcoinModel = mongoose.model('BitcoinModel', BitcoinModelSchema );

module.exports = BitcoinModel;