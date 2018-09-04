const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskModelSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	category: {
		type: String
	},
	details: {
		type: String
	},
	dueDate: {
		type: Date
	},
	creationDate: {
		type: Date,
		default: Date.now
	}
});

const Task = mongoose.model('Task', taskModelSchema);

module.exports = Task;