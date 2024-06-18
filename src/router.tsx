import { Navigate, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import Cookies from "js-cookie";

const isUserAuthentificated = (): boolean => {
	return !!Cookies.get("user_token");
};

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: isUserAuthentificated() ? <Dashboard /> : <Navigate to={"login"} />,
			},
			{
				path: "/login",
				element: isUserAuthentificated() ? <Navigate to={"/dashboard"} /> : <Login />,
			},
			{
				path: "/register",
				element: isUserAuthentificated() ? <Navigate to={"/"} /> : <Register />,
			},
		],
	},
]);
