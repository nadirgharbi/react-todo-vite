import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Toaster, toast } from "sonner";
import { userLogin } from "../api/users";
import { NavLink } from "react-router-dom";
import { Spinner } from "flowbite-react";
import Cookies from "js-cookie";
import { Logo } from "./Logo";

export const Login: React.FC = () => {
	const [user, setUser] = useState<UserLogin>({ email: "", password: "" });
	const [isCorrect, setIsCorrect] = useState({
		full_name: true,
		email: true,
		password: true,
		confirm_password: true,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const inputStyle = "bg-lighty dark:bg-darky border-darky/20 dark:border-lighty/20 ";

	const handleSubmit = async () => {
		// login
		userLogin(user)
			.then((response) => {
				setIsSubmitting(true);
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	return (
		<div className="min-h-screen flex justify-center items-center px-4 bg-lighty dark:bg-darky text-darky dark:text-lighty">
			<Toaster position="top-center" richColors closeButton />
			<Card className="w-[400px] shadow-none border-darky/20 dark:border-lighty/20">
				<CardHeader>
					<CardTitle className="text-3xl font-bold">
						<Logo />
					</CardTitle>
					<CardDescription>Connectez-vous a votre compte MyTodo</CardDescription>
				</CardHeader>

				<CardContent>
					<form className="space-y-2">
						{/* Email */}
						<div className="space-y-1">
							<Label>Email</Label>
							<Input className={inputStyle + !Boolean(user.email) && !isCorrect.email ? "border-red-500 dark:border-red-400" : ""} type="email" placeholder="john@doe.com" onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} required />
						</div>
						{/* Password */}
						<div className="space-y-1">
							<Label>Mot de passe</Label>
							<Input className={inputStyle + !Boolean(user.password) && !isCorrect.password ? "border-red-500 dark:border-red-400" : ""} type="password" placeholder="**********" onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} required />
						</div>
					</form>
				</CardContent>

				<CardFooter className="flex flex-col items-start gap-2">
					<Button className="bg-darky text-lighty dark:bg-lighty dark:text-darky" onClick={handleSubmit}>
						{isSubmitting ? <Spinner /> : "Se connecter"}
					</Button>
					<NavLink to={"/register"} className={"text-sm underline underline-offset-2"}>
						J'ai deja un compte
					</NavLink>
				</CardFooter>
			</Card>
		</div>
	);
};
