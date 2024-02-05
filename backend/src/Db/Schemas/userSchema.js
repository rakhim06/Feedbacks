const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
        role: {
            type: String,
            required: true,
            default: "user"
        },
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
)
// Avant de sauvegarder le mot de passe, nous le hachons avec bcrypt
userSchema.pre("save", function (next) {
	const user = this

	if (!user.isModified("password")) return next()

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err)

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err)

			user.password = hash
			next()
		})
	})
})

module.exports = userSchema
