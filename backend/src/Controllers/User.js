const User = require("../Db/Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function createUser(req, res) {
	try {
		const { email, name, password } = req.body

		// Check if the user already exists
		const existingUser = await User.getOne({ email })
		if (existingUser) {
			return res.code(409).send({ message: "User already exists." })
		}

		// Create a new user
		const newUser = await User.new({ email, name, password })

		res.code(201).send({ status: "ok", message: "User registered successfully." })
	} catch (error) {
		console.error(error)
		res.code(500).send({ status: "fail", message: "Internal Server Error" })
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body

		// Find the user by email
		const user = await User.getOne({ email })

		// Check if the user exists
		if (!user) {
			return res.code(401).send({ message: "This user does not exist"})
		}

		// Compare the provided password with the hashed password stored in the database
		const passwordMatch = await bcrypt.compare(password, user.password)

		if (!passwordMatch) {
			return res.code(401).send({ message: "Invalid e-mail/password" })
		}

		// Create a JWT token
		const token = jwt.sign({ userId: user._id }, "a-secret", { expiresIn: "1h" })

		res.send({ token })
	} catch (error) {
		console.error(error)
		res.code(500).send({ message: "Internal Server Error" })
	}
}

module.exports = {
    createUser,
    login,
}