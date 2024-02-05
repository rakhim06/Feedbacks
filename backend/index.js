const fastify = require("fastify")
const cors = require("@fastify/cors")

const { saveFeedback, getFeedbacks } = require("./src/Controllers/Feedbacks")
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
app.get("/feedbacks", getFeedbacks)

app.get("/", (req, res) => {
    res.send("Hello World")
})

// Start the server
const port = 3000
const host = "localhost"
app.listen({ port, host }, () => console.log(`Server listening on port ${port}`))
