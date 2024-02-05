const connection = require("../connection")
const Schema = require("../Schemas/userSchema")

Object.assign(Schema.statics, {
	new: async (data) => {
		return User.create(data)
	},
	update: async (find, data) => {
		await User.updateMany(find, data)
		return true
	},
	delete: async (data) => {
		await User.deleteMany(data)
		return true
	},
	get: async (match, sort = {}) => {
		return User.find(match).sort(sort)
	},
	getOne: async (match, sort = {}) => {
		return User.findOne(match).sort(sort)
	},
})
const User = connection.model("users", Schema)

module.exports = User
