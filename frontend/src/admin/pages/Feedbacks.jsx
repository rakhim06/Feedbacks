import React, { useEffect, useState } from "react"
import { BsEmojiNeutral, BsEmojiSmile, BsEmojiFrown } from "react-icons/bs"
import { IconContext } from "react-icons"
import { useNavigate } from "react-router-dom"

const Feedbacks = () => {
	const [feedbacks, setFeedbacks] = useState([])
	const [feedbackCounts, setFeedbackCounts] = useState({ positive: 0, negative: 0, neutral: 0, total: 0 })
	const navigate = useNavigate()

	useEffect(() => {
		const loggedInUser = localStorage.getItem("token")
		if (!loggedInUser) {
			navigate("/admin/login")
		}
		fetch("https://acme-feedbacks.publicvm.com/api/admin/feedbacks", {
			headers: {
				Authorization: loggedInUser,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Unauthorized access to feedbacks page. Please login as administrator.")
				}
				return response.json()
			})
			.then((data) => {
				const sortedFeedbacks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				setFeedbacks(sortedFeedbacks)

				const feedbackCounts = data.reduce(
					(counts, feedback) => {
						if (feedback.sentiment === "positive") {
							counts.positive += 1
						} else if (feedback.sentiment === "negative") {
							counts.negative += 1
						} else if (feedback.sentiment === "neutral") {
							counts.neutral += 1
						}
						counts.total = data.length
						return counts
					},
					{ positive: 0, negative: 0, neutral: 0, total: 0 }
				)
				setFeedbackCounts(feedbackCounts)
			})
			.catch((error) => alert(error))
	}, [navigate])

	return (
		<div>
			<div className="mx-auto max-w-7xl py-16">
				<div className="">
					<div className="min-w-0 flex-1">
						<h2 className="mt-2 text-2xl font-bold leading-7 text-gray-50  sm:truncate sm:text-3xl sm:tracking-tight">Feedbacks</h2>
						<div className="my-4 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
							<div className="mt-2 flex items-center text-sm text-gray-50 ">Total : {feedbackCounts.total}</div>
							<div className="mt-2 flex items-center text-sm text-gray-50 ">Positive : {feedbackCounts.positive} </div>
							<div className="mt-2 flex items-center text-sm text-gray-50 ">Negative : {feedbackCounts.negative} </div>
							<div className="mt-2 flex items-center text-sm text-gray-50 ">Negative : {feedbackCounts.neutral} </div>
						</div>
					</div>
				</div>
				{feedbacks.map((feedback) => (
					<div key={feedback._id} className="py-10 border-t flex items-start gap-x-3">
						<IconContext.Provider value={{ className: "h-6 w-6", color: "white", style: { verticalAlign: "top" } }}>
							<div>
								{feedback.sentiment === "positive" && <BsEmojiSmile />}
								{feedback.sentiment === "neutral" && <BsEmojiNeutral />}
								{feedback.sentiment === "negative" && <BsEmojiFrown />}{" "}
							</div>
						</IconContext.Provider>
						<div className="max-w-6xl ">
							<h3 className="text-base leading-snug text-gray-50 text-opacity-100">{feedback.name}</h3>
							<time dateTime={feedback.createdAt} className="flex-none text-xs text-gray-50 ">
								{new Date(feedback.createdAt).toLocaleString()}
							</time>
							<p className="mt-3 text-base leading-snug text-gray-50 text-opacity-100">{feedback.text}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Feedbacks
