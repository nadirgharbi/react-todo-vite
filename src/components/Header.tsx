import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ui/theme-provider";

export const Header = () => {
	const { setTheme } = useTheme();
	const currentMode = localStorage.getItem("vite-ui-theme");

	const handleMode = () => {
		setTheme(currentMode === "dark" ? "light" : "dark");
	};

	return (
		<>
			<div className="fixed w-full bg-lighty dark:bg-darky text-center">
				<Button className="" variant="outline" size="icon" onClick={handleMode}>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-darky dark:text-lighty" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-darky dark:text-lighty" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</div>
		</>
	);
};
