import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Header } from "./components/Header";

export const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="">
				<Header />
				<Outlet />
			</div>
		</ThemeProvider>
	);
};
