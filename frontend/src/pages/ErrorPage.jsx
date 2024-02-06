import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<div id="error-page">
			<h1 className="block text-2xl font-medium leading-6 text-white">Oops!</h1>
			<p className="block text-sm font-medium leading-6 text-white">Sorry, an unexpected error has occurred.</p>
			<p>
				<i className="block text-sm font-medium leading-6 text-white">{error.statusText || error.message}</i>
			</p>
		</div>
	)
}
