import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Spinner, Flowbite, DarkThemeToggle, Badge, Modal, Label, TextInput, Select, Button } from "flowbite-react";
import { TodoList } from "./components/TodoList";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter, FaReddit } from "react-icons/fa6";
import { BiPlus } from "react-icons/bi";

interface Tasks {
	userId: number;
	id: number;
	title: string;
	completed: string;
}

function App() {
	const currentYear = new Date();
	const [todos, setTodos] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	// Tasks data form to post in api
	const [task, setTask] = useState<Tasks>({
		userId: 2,
		id: 1,
		title: "",
		completed: "false",
	});

	useEffect(() => {
		axios.get("http://localhost:3000/todos").then((result: AxiosResponse) => {
			setTodos(result.data);
		});
	}, []);

	const handleAdd = () => {
		try {
			axios.post("http://localhost:3000/todos", task);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{/* Modal to add tasks */}
			<Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter une nouvelle tâche</h3>
						<div>
							<div className="mb-2 block">
								<Label value="Nom" />
							</div>
							<TextInput id="text" placeholder="Acheter du pain..." required onChange={(e) => setTask((prevTask) => ({ ...prevTask, title: e.target.value }))} />
						</div>
						<div>
							<div className="mb-2 block">
								<Label value="Etat de la tâche" />
							</div>
							<Select id="countries" required onChange={(e) => setTask((prevTask) => ({ ...prevTask, completed: e.target.value }))}>
								<option value={"false"}>En cours</option>
								<option value={"true"}>Terminée</option>
							</Select>
						</div>

						<div className="w-full flex gap-2">
							<Button color="blue" className="w-full" onClick={handleAdd}>
								Ajouter
							</Button>
							<Button color="light" className="w-full" onClick={() => setOpenModal(false)}>
								Annuler
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<div className="p-8 ">
				<Flowbite>
					<div className="absolute top-10">
						<DarkThemeToggle />
					</div>
					<div className="text-center text-zinc-800 dark:text-white font-semibold">
						<div>
							<h1 className="text-3xl font-bold">TODO LIST</h1>
							<p className="font-normal">Bienvenue sur votre todo list</p>
						</div>
						<div className="py-5 flex flex-col items-center">
							{todos.length > 0 ? (
								<TodoList todos={todos} />
							) : todos.length == 0 ? (
								<Button color="gray" onClick={() => setOpenModal(true)}>
									<BiPlus className="me-1" />
									Ajouter une tâche
								</Button>
							) : (
								<div className="space-y-3">
									<Spinner />
									<p className="font-normal flex gap-1">
										Si le chargement est trop long, veuillez vérifier que le serveur
										<Badge color={"gray"} size={"sm"}>
											json
										</Badge>
										est correctement lancée
									</p>
								</div>
							)}
						</div>
					</div>
				</Flowbite>
			</div>
			{/* Footer */}
			<div className="fixed flex flex-col gap-1 justify-center items-center bottom-0 p-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border-t dark:border-t-white/10 w-full">
				<small>{currentYear.getFullYear()} &copy; Nadir GHARBI - v0.1</small>
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
