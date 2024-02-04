const connection = require("../connection")
const Schema  = require("../Schemas/feedbackSchema")


Object.assign(Schema.statics, {
    new: async (data) => {
        return Feedback.create(data)
    },
    update: async (find, data) => {
        await Feedback.updateMany(find, data)
        return true
    },
    delete: async (data) => {
        await Feedback.deleteMany(data)
        return true
    },
    get: async (match, sort = {}) => {
        return Feedback.find(match).sort(sort)
    },
    getOne: async (match, sort = {}) => {
        return Feedback.findOne(match).sort(sort)
    },
})
const Feedback = connection.model("feedbacks", Schema)

module.exports = Feedback

