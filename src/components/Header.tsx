import { Button } from "./ui/button";
import { Sun, Moon, CheckCircle } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import React, { useEffect, useState } from "react";
import { getUserData } from "../api/users";
import { UserRound } from "lucide-react";
import { Logo } from "./Logo";

export const Header: React.FC = () => {
	const { setTheme } = useTheme();
	const currentMode = localStorage.getItem("vite-ui-theme");
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUserData();
				setUser(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
			}
		};
		fetchUser();
	}, []);

	const handleMode = () => {
		setTheme(currentMode === "dark" ? "light" : "dark");
	};
	

	return (
		<>
			<div className="flex w-full fixed bg-lighty dark:bg-darky justify-between p-3 transition-all">
				<Logo />
				{/* Dark / Light Mode */}
				<div>
					<Button className="" variant="outline" size="icon" onClick={handleMode}>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-darky dark:text-lighty" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-darky dark:text-lighty" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
		</>
	);
};
