import React, { useState } from "react";
import { Pagination, Table, Dropdown, Button, TextInput, Spinner, Badge } from "flowbite-react";
import axios from "axios";
import { FaDeleteLeft, FaPen } from "react-icons/fa6";
import { BiPlus, BiSolidTrash, BiSortUp, BiSortDown, BiSearch, BiFilter, BiSortAZ } from "react-icons/bi";
import { HiCheck, HiClock } from "react-icons/hi";
import { FaTasks  } from "react-icons/fa";
import notFound from "../assets/not-found.svg";

interface TodosProps {
	todos: Array<{
		userId: number;
		id: string; // Change this to string
		title: string;
		completed: boolean;
	}>;
}

export const TodoList: React.FC<TodosProps> = ({ todos }) => {
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState<number>(1);

	const onPageChange = (page: number) => setCurrentPage(page);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const visibleTodos = todos.slice(startIndex, endIndex);

	console.log(visibleTodos.length);

	const handleEdit = () => {
		// Gérer l'édition ici
	};

	const handleAdd = () => {
		// Gérer l'édition ici
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
						<Button color="gray">
							<BiPlus className="me-1" />
							Ajouter une tâche
						</Button>
						{/* <Dropdown size="sm" label="Action" dismissOnClick={false} color="gray" className="grid" placement="right">
							<Dropdown.Item>
								<BiPlus />
								<span className="ps-3">Ajouter une tâche</span>
							</Dropdown.Item>
							<Dropdown.Item
								className="text-red-500 dark:text-red-400"
								onClick={handleAdd} // Assurez-vous que todo.id est de type number
							>
								<BiSolidTrash />
								<span className="ps-3">Supprimer toutes les tâches</span>
							</Dropdown.Item>
						</Dropdown> */}
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
						<Table striped>
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
									<Table.Row key={todo.id} className="bg-white border-b even:bg-zinc-100">
										<Table.Cell scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
											{todo.id}
										</Table.Cell>
										<Table.Cell className="px-6 py-4">{todo.title}</Table.Cell>
										<Table.Cell className="px-6 py-4">
											{todo.completed ? (
												<Badge color="success" icon={HiCheck} className="w-20">
													Terminée
												</Badge>
											) : (
												<Badge color="warning" icon={HiClock} className="w-20">
													En cours
												</Badge>
											)}

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
