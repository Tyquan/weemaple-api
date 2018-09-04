const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
    	type: Schema.Types.ObjectId,
    	ref: 'User'
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    create_date: {
    	type: Date,
    	default: Date.now
    }
});

// Compile model from schema
const Post = mongoose.model('Post', PostSchema );

module.exports = Post;