const User = require("../Db/Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function login(req, res) {
	try {
		const { email, password } = req.body

		// Find the user by email
		const user = await User.getOne({ email })

		// Check if the user exists
		if (!user) {
			return res.code(401).send({ message: "This user does not exist" })
		}

		// Compare the provided password with the hashed password stored in the database
		const passwordMatch = await bcrypt.compare(password, user.password)

		if (!passwordMatch) {
			return res.code(401).send({ message: "Invalid e-mail/password" })
		}
		console.log(user)
		// Create a JWT token
		const token = jwt.sign({ userId: user._id, name: user.name, role: user.role }, "a-secret", { expiresIn: "1h" })

		res.send({ token })
	} catch (error) {
		console.error(error)
		res.code(500).send({ message: "Internal Server Error" })
	}
}

module.exports = {
 	login,
}
