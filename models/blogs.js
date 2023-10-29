const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "userModel",
	},
	state: {
		type: String,
		enum: ["draft", "published"],
	},
	read_count: {
		type: Number,
	},
	reading_time: {
		type: Number,
	},
	tags: {
		type: [String],
	},
	body: {
		type: String,
		required: true,
	},
	postedAt: {
		type: Date,
		default: new Date().toString(),
	},
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
