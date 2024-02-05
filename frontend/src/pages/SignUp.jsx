import React, { useState } from "react"

const RegisterPage = () => {
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const handleRegister = async (event) => {
		event.preventDefault()

		try {
			if (password !== confirmPassword) {
				alert("Les mots de passe ne correspondent pas !")
				return
			}
			const response = await fetch("https://acme-feedbacks.publicvm.com/api/create-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, name, password }),
			})

			if (response.status === "fail") {
				throw new Error("Registration failed")
			}

			// Redirect to login page or handle registration success as needed
		} catch (error) {
			console.error("Registration error:", error)
			// Handle registration error (display a message, etc.)
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Create your account</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleRegister}>
						<div>
							<label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
								Name
							</label>
							<div className="mt-2">
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									id="name"
									name="name"
									type="text"
									autoComplete="Name"
									required
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
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
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
									Confirm password
								</label>
							</div>
							<div className="mt-2">
								<input
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default RegisterPage
