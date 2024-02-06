import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const navigate = useNavigate()

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const response = await fetch("https://acme-feedbacks.publicvm.com/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})

			if (!response.ok) {
				alert("Invalid email or password")
				throw new Error("Invalid email or password")
			}

			const { token } = await response.json()

			// Save the token in localStorage
			localStorage.setItem("token", token)

			// Redirect to the feedbackss page
            console.log("Login successful")
            navigate("/admin/feedbacks")
		} catch (error) {
			console.error("Login error:", error)
			// Handle login error (display a message, etc.)
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleLogin}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
								Email address
							</label>
							<div className="mt-2">
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
								<p className="block text-sm font-medium leading-6 text-white">Email: admin@acme-corp.com</p>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
								<p className="block text-sm font-medium leading-6 text-white">Password: admin</p>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginPage
