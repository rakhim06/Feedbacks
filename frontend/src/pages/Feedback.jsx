import { useState } from "react"

const Feedback = () => {
		const [name, setName] = useState("")
		const [feedback, setFeedback] = useState("")
		const handleSubmit = async (event) => {
			event.preventDefault()

			const response = await fetch("https://acme-feedbacks.publicvm.com/api/submit-feedback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: name, text: feedback }),
			})

			if (response.ok) {
				alert("Feedback submitted")
			} else {
				alert("Error submitting feedback")
			}
		}
	return (
		<div className="text-white py-20 w-screen h-screen">
			<div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
				<div className="flex flex-col w-full lg:w-1/3 p-8">
					<h3 className="text-3xl text-red-400 md:text-5xl my-4 leading-relaxed md:leading-snug font-semibold">We Value Your Feedback!</h3>
					<p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
						Your feedback helps us understand what we do well and where we can improve. We&apos;d love to know your thoughts on our services and how we can
						enhance your experience!
					</p>
				</div>
				<div className="flex flex-col w-full lg:w-2/3 justify-center">
					<div className="container w-full px-4">
						<div className="flex flex-wrap justify-center">
							<div className="w-full lg:w-6/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
									<div className="flex-auto p-5 lg:p-10">
										<h4 className="text-2xl mb-4 text-black font-semibold">Share your thoughts with us</h4>
										<form id="feedbackForm" action="" method="">
											<div className="relative w-full mb-3"></div>
											<div className="relative w-full mb-3">
												<div className="relative w-full mb-3">
													<label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="name">
														Name
													</label>
													<input
														onChange={(e) => setName(e.target.value)}
														type="text"
														name="name"
														id="name"
														className="border-0 px-3 py-3 rounded text-sm shadow w-full bg-gray-300 placeholder-black text-gray-800 outline-none "
														placeholder="Your name"
														required
													/>
												</div>
												<label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="message">
													Message
												</label>
												<textarea
													onChange={(e) => setFeedback(e.target.value)}
													maxLength="1000"
													name="feedback"
													id="feedback"
													rows="8"
													cols="150"
													className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
													placeholder="Your feedback"
													required
												></textarea>
											</div>
											<div className="text-center mt-6">
												<button
													onClick={handleSubmit}
													id="feedbackBtn"
													className="bg-red-400 text-white text-center mx-auto active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
													type="submit"
													style={{ transition: "all 0.15s ease 0s" }}
												>
													Submit
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feedback
