import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./pages/ErrorPages.jsx"
import Feedback from "./pages/Feedback"
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
		],
	},
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
