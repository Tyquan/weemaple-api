const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestModelSchema = new Schema({
    title: {
    	type: String
    },
    reason: {
        type: String
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    creation_date: {
    	type: Date,
    	default: Date.now
    },
    updated: {
    	type: Date, 
    	default: Date.now
    }
});

// Compile model from schema
const Interest = mongoose.model('Interest', InterestModelSchema );

module.exports = Interest;