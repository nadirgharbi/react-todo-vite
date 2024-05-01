import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const Login: React.FC = () => {

	const [user, setUser] = useState()

	return (
		<div className="min-h-screen flex justify-center items-center px-4 bg-lighty dark:bg-darky text-darky dark:text-lighty">
			<Card className="w-[400px] shadow-none border-darky/20 dark:border-lighty/20">
				<CardHeader>
					<CardTitle className="text-3xl font-bold">MyTodo</CardTitle>
					<CardDescription>Connectez-vous a votre compte MyTodo</CardDescription>
				</CardHeader>

				<CardContent>
					{/* Email */}
					<div>
						<Label htmlFor="name">Email</Label>
						<Input className="bg-lighty dark:bg-darky border-darky/20 dark:border-lighty/20" type="email" id="name" placeholder="john@doe.com" />
					</div>
					{/* Password */}
					<div>
						<Label htmlFor="password">Mot de passe</Label>
						<Input className="bg-lighty dark:bg-darky border-darky/20 dark:border-lighty/20" type="password" id="password" placeholder="**********" />
					</div>
				</CardContent>

				<CardFooter>
					<Button className="bg-darky text-lighty dark:bg-lighty dark:text-darky">Se connecter</Button>
				</CardFooter>
			</Card>
			{/* <Card className="w-96 border-lighty/30">
				<CardHeader>
					<CardTitle>Connexion</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Email</Label>
								<Input id="name" placeholder="john@doe.com" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Mot de passe</Label>
								<Input id="password" placeholder="**********" />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button>Se connecter</Button>
				</CardFooter>
			</Card> */}
		</div>
	);
};
