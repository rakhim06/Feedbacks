const Feedback = require("../Db/Models/Feedback")
const Sentiment = require("sentiment")
const sentiment = new Sentiment()

// save feedback
async function saveFeedback(req, res) {
	const { name, text } = req.body

    if (text.length > 1000) {
        return res.status(400).send({ error: "Text length exceeds the limit of 1000 words" })
    }

    const { score } = sentiment.analyze(text)
    const sentimentType = score < 0 ? "negative" : score === 0 ? "neutral" : "positive"

    const feedback = {
        name,
        text,
        sentiment: sentimentType,
    }

    try {
        await Feedback.new(feedback)
        res.status(201).send({ message: "Feedback saved successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: "Failed to save feedback" })
    }
}

// get feedbacks
async function getFeedbacks(req, res) {
    try {
        // Retrieve all feedbacks from the database
        const feedbacks = await Feedback.get()

        // Return the feedbacks with sentiments
        res.status(200).send(feedbacks)
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve feedbacks" })
    }
}

module.exports = {
    saveFeedback,
    getFeedbacks
}