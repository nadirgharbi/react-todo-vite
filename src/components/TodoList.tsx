import React, { useState } from "react";
import { Pagination, Table, Dropdown, Button, TextInput, Badge, Label, Modal, Select } from "flowbite-react";
import axios from "axios";
import { FaDeleteLeft, FaPen } from "react-icons/fa6";
import { BiPlus, BiSearch, BiSortAZ } from "react-icons/bi";
import { HiCheck, HiClock } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import notFound from "../assets/not-found.svg";

interface TodosProps {
	todos: Array<{
		userId: number;
		id: number; // Change this to string
		title: string;
		completed: boolean;
	}>;
}

interface Tasks {
	userId: number;
	id: number;
	title: string;
	completed: string;
}

export const TodoList: React.FC<TodosProps> = ({ todos }) => {
	// Open et Close Modal states
	const [openModal, setOpenModal] = useState(false);

	// Convertir les clés en tableau (tds => todos)
	let tds: string[] = Object.keys(todos);

	// Afficher le dernier élément
	let last: string = tds[tds.length - 1];
	let lastID: number = Number(todos[last].id);
	console.log(lastID);

	// Tasks data form to post in api
	const [task, setTask] = useState<Tasks>({
		userId: 2,
		id: lastID + 1,
		title: "",
		completed: "false",
	});

	// For Pagination
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const onPageChange = (page: number) => setCurrentPage(page);

	// Displaying in table
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const visibleTodos = todos.slice(startIndex, endIndex);

	const handleEdit = () => {
		// Gérer l'édition ici
	};

	const handleAdd = () => {
		try {
			axios.post("http://localhost:3000/todos", task);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:3000/todos/${id}`)
			.then((response) => {
				console.log(`Deleted post with ID ${id}`, response);
				window.location.reload();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			{visibleTodos.length > 0 ? (
				<>
					{/* Add New Task */}
					<div className="flex justify-between w-1/2 gap-1">
						<Button color="gray" onClick={() => setOpenModal(true)}>
							<BiPlus className="me-1" />
							Ajouter une tâche
						</Button>
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
						<div className="flex gap-1">
							<TextInput type="text" icon={BiSearch} placeholder="Rechercher" />
							{/* Sort */}
							<Dropdown size="sm" label="Trier" dismissOnClick={false} color="gray">
								<Dropdown.Item>
									<BiSortAZ />
									<span className="ps-3">Par alphabétique</span>
								</Dropdown.Item>
								<Dropdown.Item>
									<FaTasks />
									<span className="ps-3">Par état</span>
								</Dropdown.Item>
							</Dropdown>
							{/* Filter  */}
							<Dropdown size="sm" label="Filtrer" dismissOnClick={false} color="gray">
								<Dropdown.Item>
									<HiCheck />
									<span className="ps-3">Terminée</span>
								</Dropdown.Item>
								<Dropdown.Item>
									<HiClock />
									<span className="ps-3">En cours</span>
								</Dropdown.Item>
							</Dropdown>
						</div>
					</div>

					{/* Todolist */}
					<div className="pt-5 w-1/2">
						<Table striped hoverable>
							<Table.Head>
								<Table.HeadCell> </Table.HeadCell>
								<Table.HeadCell>Nom</Table.HeadCell>
								<Table.HeadCell>Etat</Table.HeadCell>
								<Table.HeadCell>
									<span className="sr-only">Edit</span>
								</Table.HeadCell>
							</Table.Head>
							<Table.Body className="divide-y">
								{visibleTodos.map((todo) => (
									<Table.Row key={todo.id} className="border-b border-zinc-300 dark:border-white/30 even:bg-zinc-100">
										<Table.Cell scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
											{todo.id}
										</Table.Cell>
										<Table.Cell className="px-6 py-4">{todo.title}</Table.Cell>
										<Table.Cell className="px-6 py-4">
											{todo.completed.toString() == "true" ? <Badge color="success" icon={HiCheck} className="w-6 h-6" /> : <Badge color="warning" icon={HiClock} className="w-6 h-6" />}

											{/* <span>{todo.completed ? "Terminée" : "En cours"}</span> */}
										</Table.Cell>
										<Table.Cell className="px-6 py-4 left-0">
											<Dropdown size="sm" label="Actions" dismissOnClick={false} color="gray">
												<Dropdown.Item>
													<FaPen />
													<span className="ps-3">Modifier</span>
												</Dropdown.Item>
												<Dropdown.Item
													className="text-red-500 dark:text-red-400"
													onClick={() => handleDelete(todo.id)} // Assurez-vous que todo.id est de type number
												>
													<FaDeleteLeft />
													<span className="ps-3">Supprimer</span>
												</Dropdown.Item>
											</Dropdown>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
						<div className={`text-center my-6 `}>
							<Pagination currentPage={currentPage} totalPages={Math.ceil(todos.length / itemsPerPage)} onPageChange={onPageChange} showIcons />
						</div>
					</div>
				</>
			) : (
				visibleTodos.length ?? (
					<>
						<p className="text-center">Aucun élement trouvés...</p>
						<img src={notFound} width={420} className="py-5" />
						<Button color="gray">
							<BiPlus />
							Ajouter une nouvelle tâche
						</Button>
					</>
				)
			)}
		</>
	);
};
