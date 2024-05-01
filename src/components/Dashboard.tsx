import React, { useEffect, useState } from "react";
import { getUserData } from "../api/users";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { createTodo, deleteTodos, getTodos, updateTodo } from "../api/todos";
import { Badge } from "./ui/badge";
import { HiPlus } from "react-icons/hi2";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const Dashboard: React.FC = () => {
	const [user, setUser] = useState<any>(null);
	const [todos, setTodos] = useState<Array<Todos>>([]);
	const [editTodo, setEditTodo] = useState<TodoUpdate>({});
	const [newTodo, setNewTodo] = useState<Todos>({ title: "", completed: 0 });
	const [deleteTodo, setDeleteTodo] = useState<TodoDelete>({});
	const [openAdd, setOpenAdd] = useState<boolean | undefined>(undefined);
	const [openEdit, setOpenEdit] = useState<boolean | undefined>(undefined);
	const [openDelete, setOpenDelete] = useState<boolean | undefined>(undefined);

	// Ajout d'une tache
	const handleAdd = () => {
		createTodo(newTodo);
		setOpenAdd(false);
	};

	// Recupere les donnes de la tache que l'on a selectionner
	const handleEdit = (todo: Todos) => {
		setOpenEdit(true);
		setEditTodo({
			id: todo.id,
			title: todo.title,
			completed: todo.completed,
		});
	};

	// Applique les modifications dans la base de donnees
	const handleSave = () => {
		updateTodo(editTodo, editTodo.id);
		setOpenEdit(false);
	};

	// Recupere l'identifiant de la tache que l'on souhaite supprimer
	const handleDelete = (todo: Todos) => {
		setOpenDelete(true);
		setDeleteTodo({
			id: todo.id,
		});
	};

	// Suppresion de la tache dans la base de donnees
	const handleConfirm = () => {
		deleteTodos(deleteTodo.id);
		setOpenDelete(false);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUserData();
				setUser(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
			}
		};

		const fetchTodos = async () => {
			try {
				const data = await getTodos();
				setTodos(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des taches :", error);
			}
		};
		getTodos()
			.then((response) => {
				setTodos(response);
			})
			.catch((error) => {
				console.log(error);
			});

		fetchUser();
		fetchTodos();
	}, [todos, user]);

	return (
		<div className="min-h-screen flex flex-col gap-12 p-32 bg-lighty dark:bg-darky text-darky dark:text-lighty transition-all">
			{user && <p className="text-xl font-semibold text-center">Bonjour {user.fullName}</p>}
			<div className="mx-auto space-y-10">
				{/* Head of table */}
				<div className="flex gap-3 justify-between">
					{/* Modals */}

					{/* ADD */}
					<Dialog open={openAdd}>
						<DialogOverlay className="bg-black/80" />
						<DialogTrigger asChild>
							<Button className="flex gap-1" variant="outline" onClick={() => setOpenAdd(true)}>
								<HiPlus className="w-4 h-4" strokeWidth={1} />
								Ajouter un Todo
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px] text-darky dark:text-lighty">
							<DialogHeader>
								<DialogTitle>Ajouter un nouveau Todo</DialogTitle>
								<DialogDescription>Enregistrez un Todo a votre liste pour ne jamais oublier ce que vous avez a faire.</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">
										Intitulé
									</Label>
									<Input id="name" placeholder="Acheter du pain, Appeler Marc ..." className="col-span-3" onChange={(e) => setNewTodo((prev) => ({ ...prev, title: e.target.value }))} />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="username" className="text-right">
										Status
									</Label>
									<Select onValueChange={(e) => setNewTodo((prev) => ({ ...prev, completed: parseInt(e) }))}>
										<SelectTrigger className="col-span-3">
											<SelectValue placeholder="Selectionnez un statut" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value={"0"}>En cours</SelectItem>
												<SelectItem value={"1"}>Terminée</SelectItem>
												<SelectItem value={"2"}>En attente</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>
							<DialogFooter className="">
								<Button type="submit" onClick={handleAdd}>
									Ajouter
								</Button>
								<Button type="submit" onClick={() => setOpenAdd(false)} variant={"outline"}>
									Annuler
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				{/* Table of Todos */}
				<Table className="w-full">
					<TableCaption>&copy;2024 - Nadir GHARBI</TableCaption>
					<TableHeader>
						<TableRow className="border-b-darky/30 dark:border-b-lighty/30">
							<TableHead className="w-auto">
								<Checkbox onCheckedChange={() => {}} />
							</TableHead>
							<TableHead className="w-80">Intitulé</TableHead>
							<TableHead className="w-80">Statut</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{todos.map((todo, key) => (
							<>
								<TableRow key={key} className="border-b-darky/30 dark:border-b-lighty/30">
									<TableCell className="font-medium">
										<Checkbox />
									</TableCell>
									<TableCell>{todo.title}</TableCell>
									<TableCell>
										{todo.completed === 0 ? (
											<Badge variant={"outline"} className="bg-yellow-100 text-yellow-800 text-xs font-medium rounded dark:bg-lighty/5 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-300">
												En cours
											</Badge>
										) : todo.completed === 1 ? (
											<Badge variant={"outline"} className="bg-green-100 text-green-800 text-xs font-medium rounded dark:bg-lighty/5 dark:text-green-300 border border-green-300 dark:border-green-300">
												Terminée
											</Badge>
										) : (
											<Badge variant={"outline"} className="bg-stone-100 text-stone-800 text-xs font-medium rounded dark:bg-lighty/5 dark:text-stone-300 border border-stone-300 dark:border-stone-300">
												En attente
											</Badge>
										)}
									</TableCell>
									<TableCell className="text-right">
										{/* Dropdown action */}
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline" className="h-8 w-8 p-0">
													<span className="sr-only">Open menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem onClick={() => handleEdit(todo)}>
													{/* EDIT */}
													Modifier
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleDelete(todo)} className="text-red-400 hover:bg-red-500 dark:focus:bg-red-600/30 ">
													Supprimer
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>

								{/* EDIT DIALOG */}
								<Dialog open={openEdit}>
									<DialogOverlay className="bg-black/10 transition-colors" />
									<DialogContent className="sm:max-w-[425px] text-darky dark:text-lighty">
										<DialogHeader>
											<DialogTitle>Ajouter un nouveau Todo</DialogTitle>
											<DialogDescription>Enregistrez un Todo a votre liste pour ne jamais oublier ce que vous avez a faire.</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="name" className="text-right">
													Intitulé
												</Label>
												<Input id="name" defaultValue={editTodo.title} onChange={(e) => setEditTodo((prev) => ({ ...prev, title: e.target.value }))} className="col-span-3" />
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="username" className="text-right">
													Status
												</Label>
												<Select onValueChange={(e) => setEditTodo((prev) => ({ ...prev, completed: parseInt(e) }))} defaultValue={editTodo.completed?.toString()}>
													<SelectTrigger className="col-span-3">
														<SelectValue placeholder="Selectionnez un statut" defaultValue={todo.completed} />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectItem value={"0"}>En cours</SelectItem>
															<SelectItem value={"1"}>Terminée</SelectItem>
															<SelectItem value={"2"}>En attente</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</div>
										</div>
										<DialogFooter>
											<Button type="submit" onClick={() => handleSave()}>
												Enregitrer
											</Button>
											<Button type="submit" onClick={() => setOpenEdit(false)} variant={"outline"}>
												Annuler
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>

								{/* DELETE DIALOG */}
								<Dialog open={openDelete}>
									<DialogOverlay className="bg-black/10 transition-colors" />
									<DialogContent className="sm:max-w-[425px] text-darky dark:text-lighty">
										<DialogHeader>
											<DialogTitle>Supprimer cette tache ?</DialogTitle>
											<DialogDescription>Attention, cette action est irreversible. Voulez-vous vraiment supprimer cette tache ?</DialogDescription>
										</DialogHeader>
										<DialogFooter>
											<Button type="submit" onClick={() => handleConfirm()} className="w-full" variant={"destructive"}>
												Supprimer
											</Button>
											<Button type="submit" onClick={() => setOpenDelete(false)} className="w-full" variant={"outline"}>
												Annuler
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
