import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage.jsx"
import Feedback from "./pages/Feedback"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import AdminFeedbacks from "./admin/pages/Feedbacks"
import './index.css'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "feedbacks",
				element: <Feedback />,
			},
			{
				path: "/admin/feedbacks",
				element: <AdminFeedbacks />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/login",
				element: <Login />,
			}
		],
	},
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
