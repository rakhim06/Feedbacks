const jwt = require("jsonwebtoken")

const verifyJWTandLevel = function (req, res, next) {
	const token = req.headers.authorization
	if (!token) {
		console.log("iciz")
		return res.status(401).send({ message: "Unauthorized" })
	}
	try {
		const decoded = jwt.verify(token, "a-secret")
		console.log(decoded)
		if (decoded.role !== "admin") {
			return res.status(403).send({ message: "Forbidden" })
		}
		next()
	} catch (error) {
		console.log(error)
		return res.status(401).send({ message: "Unauthorized" })
	}
}
module.exports = verifyJWTandLevel
