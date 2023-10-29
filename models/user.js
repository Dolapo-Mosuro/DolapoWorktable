const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
