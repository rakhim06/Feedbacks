const fastify = require("fastify")
const cors = require("@fastify/cors")

const { saveFeedback, getFeedbacks } = require("./src/Controllers/Feedbacks")
const { login } = require("./src/Controllers/User")
const verifyJWTandLevel = require("./src/Middleware/authorization")
// Create a Fastify app
const app = fastify()
app.register(cors, {
	origin: "*",
	methods: "GET,PUT,POST,DELETE",
	allowedHeaders: "Content-Type, Authorization",
	exposedHeaders: "Authorization",
})
// Endpoint for calculating sentiment and storing feedback
app.post("/submit-feedback", saveFeedback)

// Endpoint for retrieving saved customer text messages with sentiments
// Middleware to verify JWT token and check user role
app
	.decorate("verifyJWTandLevel", verifyJWTandLevel)
	.register(require("@fastify/auth"))
	.after(() => {
		app.get("/admin/feedbacks", { preHandler: app.auth([app.verifyJWTandLevel]) }, getFeedbacks)
	})

app.get("/health", (req, res) => {
	res.send("OK")
})

app.get("/", (req, res) => {
	res.send("Welcome to the feedbacks API")
})

// Endpoint for user login
app.post("/login", login)

// Start the server
const port = 3000
const host = "localhost"
app.listen({ port, host }, () => console.log(`Server listening on port ${port}`))
