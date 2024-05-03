import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Header } from "./components/Header";

export const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="bg-lighty dark:bg-darky">
				<Header />

				<Outlet />

				{/* <Outlet /> */}
				<div className="w-full justify-center items-center py-2 fixed bottom-0 flex gap-2">
					<p className="text-darky dark:text-lighty text-sm">MyTodo 1.0 - &copy;2024 - Nadir GHARBI</p>
				</div>
			</div>
		</ThemeProvider>
	);
};
