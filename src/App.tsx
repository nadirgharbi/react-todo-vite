import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Spinner, Flowbite, DarkThemeToggle, Dropdown, Button, Footer } from "flowbite-react";
import { TodoList } from "./components/TodoList";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter, FaReddit } from "react-icons/fa6";

function App() {
	const currentYear = new Date();
	const [todos, setTodos] = useState([]);

	const handleAdd = () => {
		// Gérer l'édition ici
	};

	useEffect(() => {
		axios.get("http://localhost:3000/todos").then((result: AxiosResponse) => {
			setTodos(result.data);
		});
	}, []);

	return (
		<>
			<div className="p-8 ">
				<Flowbite>
					<div className="absolute top-10">
						<DarkThemeToggle />
					</div>
					<div className="text-center text-zinc-800 dark:text-white font-semibold">
						<div>
							<h1 className="text-3xl font-bold">My Todo list</h1>
						</div>
						<div className="flex justify-end">
							<Dropdown size="sm" label="Action" dismissOnClick={false} color="gray">
								<Dropdown.Item>
									<span className="ps-3">Ajouter une tâche</span>
								</Dropdown.Item>
								<Dropdown.Item
									onClick={handleAdd} // Assurez-vous que todo.id est de type number
								>
									<span className="ps-3 text-red-500 dark:text-red-400">Supprimer toutes les tâches</span>
								</Dropdown.Item>
							</Dropdown>
						</div>

						<div className="py-5 flex flex-col items-center">{todos ? <TodoList todos={todos} /> : <Spinner />}</div>
					</div>
				</Flowbite>
			</div>
			{/* Footer */}
			<div className="fixed flex flex-col gap-1 justify-center items-center bottom-0 p-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border-t dark:border-t-white/10 w-full">
				<small>{currentYear.getFullYear()} &copy; Nadir GHARBI</small>
				<div className="flex gap-2">
					<a href="/">
						<FaDiscord size={20} className="text-zinc-300 dark:text-zinc-600 hover:text-[#7289da] dark:hover:text-[#7289da]" />
					</a>
					<a href="/">
						<FaGithub size={20} className="text-zinc-300 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-white" />
					</a>
					<a href="/">
						<FaLinkedin size={20} className="text-zinc-300 dark:text-zinc-600 hover:text-[#258dbf] dark:hover:text-[#258dbf]" />
					</a>
					<a href="/">
						<FaXTwitter size={20} className="text-zinc-300 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-white" />
					</a>
					<a href="/">
						<FaReddit size={20} className="text-zinc-300 dark:text-zinc-600 hover:text-[#ff4500] dark:hover:text-[#ff4500]" />
					</a>
				</div>
			</div>
		</>
	);
}

export default App;
