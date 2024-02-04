const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		maxlength: 1000,
	},
	sentiment: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
}, {
	timestamps: true,
	createdAt: "createdAt",
})

module.exports = feedbackSchema
