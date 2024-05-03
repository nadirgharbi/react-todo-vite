import React, { useEffect, useState } from "react";
import { getUserData } from "../api/users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
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
import { Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { CustomFlowbiteTheme, Pagination } from "flowbite-react";
import notFound from "@/assets/no-results.png";

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [editTodo, setEditTodo] = useState<TodoUpdate>({});
  const [newTodo, setNewTodo] = useState<Todos>({ title: "", completed: 0, userID: 0 });
  const [deleteTodo, setDeleteTodo] = useState<TodoDelete>({});
  const [openAdd, setOpenAdd] = useState<boolean | undefined>(undefined);
  const [openEdit, setOpenEdit] = useState<boolean | undefined>(undefined);
  const [openDelete, setOpenDelete] = useState<boolean | undefined>(undefined);
  const [openDeleteSelect, setOpenDeleteSelect] = useState<boolean | undefined>(undefined);
  const [realTimeUpdate, setRealTimeUpdate] = useState<boolean>(false);
  const [selectedTodos, setSelectedTodos] = useState<any>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (page: number) => setCurrentPage(page); // Change current page
  // Displaying in current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const todosSliced = todos ? todos.sort((a, b) => b.id - a.id).slice(startIndex, endIndex) : [];

  const customPagination: CustomFlowbiteTheme["pagination"] = {
    base: "",
    layout: {
      table: {
        base: "text-lg text-darky dark:text-lighty",
        span: "font-semibold text-darky dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex gap-2 items-center -space-x-px ",
      showIcon: "inline-flex",
      previous: {
        base: "transition-all ml-0 rounded-lg bg-transparent p-3 leading-tight text-darky/80 enabled:hover:bg-darky/5 enabled:hover:darky dark:bg-darky dark:text-lighty enabled:dark:hover:bg-lighty/10 enabled:dark:hover:text-lighty",
        icon: "h-5 w-5",
      },
      next: {
        base: "transition-all ml-0 rounded-lg bg-transparent p-3 leading-tight text-darky/80 enabled:hover:bg-darky/5 enabled:hover:darky dark:bg-darky dark:text-lighty enabled:dark:hover:bg-lighty/10 enabled:dark:hover:text-lighty",
        icon: "h-5 w-5",
      },
      selector: {
        base: "transition-all rounded-lg w-12 bg-transparent p-3 leading-tight text-darky enabled:hover:bg-darky/5 enabled:hover:text-darky dark:text-lighty enabled:dark:hover:bg-lighty/10 enabled:dark:hover:text-white",
        active: "transition-all ring-1 ring-darky/20 dark:ring-lighty/20 bg-transparent text-darky hover:bg-darky/5 hover:ring-0 hover:text-darky  dark:bg-transparent dark:text-lighty",
        disabled: "transition-all cursor-not-allowed opacity-50",
      },
    },
  };

  // Ajout d'une tache
  const handleAdd = () => {
    createTodo(newTodo);
    setNewTodo({ title: "", completed: 0, userID: 0 });
    setRealTimeUpdate((prev) => !prev); // Met à jour l'état pour déclencher la mise à jour en temps réel
    setSelectedTodos([]); // Réinitialiser l'état des tâches sélectionnées
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
    setRealTimeUpdate((prev) => !prev);
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
    setRealTimeUpdate((prev) => !prev);
    setOpenDelete(false);
    setSelectedTodos([]);
  };

  // gérer la sélection d'une tâche
  const handleSelectTodo = (id: number) => {
    const isSelected = selectedTodos.includes(id);
    if (isSelected) {
      setSelectedTodos(selectedTodos.filter((todoId: number) => todoId !== id));
    } else {
      setSelectedTodos([...selectedTodos, id]);
    }
  };

  // checkbox qui coche toutes les autres checkbox
  const handleMasterCheckbox = () => {
    if (selectedTodos.length < todos.length) {
      // Cocher toutes les tâches
      const allTodoIds = todosSliced.map((todo) => todo.id);
      setSelectedTodos(allTodoIds);
    } else {
      // Décocher toutes les tâches
      setSelectedTodos([]);
    }
  };

  const handleConfirmSelect = () => {
    deleteTodos(selectedTodos);
    setRealTimeUpdate((prev) => !prev);
    setOpenDelete(false);
    setOpenDeleteSelect(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        window.location.href = "/login";
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des taches :", error);
      }
    };

    fetchTodos();
  }, [realTimeUpdate]);

  return (
    <>
      <Toaster position={"top-center"} richColors className="z-[999]" />
      <div className="min-h-screen w-full flex flex-col items-center gap-12 md:p-32 bg-lighty dark:bg-darky text-darky dark:text-lighty transition-all">
        {user && <p className="text-xl font-semibold">Bonjour {user.fullName}</p>}
        {todos && (
          <>
            <div className="md:mx-auto space-y-10">
              {/* Head of table */}
              <div className={`flex flex-col items-center md:flex-row gap-3 ${todos.length > 0 ? "justify-between" : "justify-center"}`}>
                {/* ADD */}
                <Dialog open={openAdd}>
                  <DialogOverlay className="bg-black/80" />
                  <DialogTrigger className="">
                    <Button className="flex gap-1" variant="outline" onClick={() => setOpenAdd(true)}>
                      <HiPlus className="w-4 h-4" strokeWidth={1} />
                      Ajouter un Todo
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] text-darky dark:text-lighty ">
                    <DialogHeader>
                      <DialogTitle>Ajouter un nouveau Todo</DialogTitle>
                      <DialogDescription>Enregistrez un Todo a votre liste pour ne jamais oublier ce que vous avez a faire.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-3">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Intitulé
                        </Label>
                        <Input required id="name" placeholder="Acheter du pain, Appeler Marc ..." className="col-span-3" onChange={(e) => setNewTodo((prev) => ({ ...prev, title: e.target.value, userID: user.id }))} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Status
                        </Label>
                        <Select onValueChange={(e) => setNewTodo((prev) => ({ ...prev, completed: parseInt(e) }))} defaultValue={String(newTodo.completed)}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
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
                    <DialogFooter className="flex md:inline-flex gap-3">
                      <Button type="submit" onClick={!Boolean(newTodo.title) && openAdd ? () => toast.error("Veuillez indiquez le nom de votre tache") : handleAdd}>
                        Ajouter
                      </Button>
                      <Button type="submit" onClick={() => setOpenAdd(false)} variant={"outline"}>
                        Annuler
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* SELECT ITEMS PER PAGE */}

                {todos.length > 0 && (
                  <>
                    {/* Select number of items per page */}
                    <Select onValueChange={(e) => setItemsPerPage(Number(e))} defaultValue="10">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={itemsPerPage} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"5"}>5</SelectItem>
                        <SelectItem defaultChecked value={"10"}>
                          10
                        </SelectItem>
                        <SelectItem value={"15"}>15</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* DELETE BUTTON */}

                    <Dialog open={openDeleteSelect}>
                      <DialogOverlay className="bg-black/70 transition-colors" />
                      <DialogTrigger>
                        <Button onClick={() => setOpenDeleteSelect(true)} disabled={selectedTodos.length === 0} className={`flex gap-1`} variant={"destructive"}>
                          <Trash2 className="w-4 h-4" /> Supprimer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] text-darky dark:text-lighty">
                        <DialogHeader>
                          <DialogTitle>Supprimer cette tache ?</DialogTitle>
                          <DialogDescription>Attention, cette action est irreversible. Voulez-vous vraiment supprimer cette tache ?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex md:inline-flex gap-3">
                          <Button type="submit" onClick={() => handleConfirmSelect()} className="w-full" variant={"destructive"}>
                            Supprimer
                          </Button>
                          <Button type="submit" onClick={() => setOpenDeleteSelect(false)} className="w-full" variant={"outline"}>
                            Annuler
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>

              {todos.length > 0 ? (
                <div className="flex flex-col gap-16 items-center w-full  ">
                  {/* Table of Todos */}
                  <Table className="w-full last:border-b last:border-b-lighty/20 ">
                    <TableHeader>
                      <TableRow className="border-b-darky/30 dark:border-b-lighty/30">
                        <TableHead className="w-1/3 md:w-auto">
                          <Checkbox checked={selectedTodos.length == todosSliced.length && todosSliced.length > 0} onCheckedChange={handleMasterCheckbox} />
                        </TableHead>
                        <TableHead className="w-1/3 md:w-80">Intitulé</TableHead>
                        <TableHead className="w-1/6 md:w-80">Statut</TableHead>
                        <TableHead className="w-1/6 text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todosSliced.map((todo, key) => (
                        <>
                          <TableRow key={key} className="border-b-darky/30 dark:border-b-lighty/30">
                            <TableCell className="font-medium w-1/3 md:w-auto">
                              <Checkbox checked={selectedTodos.includes(todo.id)} onCheckedChange={() => handleSelectTodo(todo.id)} />
                            </TableCell>
                            <TableCell className="truncate w-1/3 md:w-80">{todo.title}</TableCell>
                            <TableCell className="w-1/6 md:w-80">
                              {/* Status Badge */}
                              {todo.completed === 0 ? (
                                <Badge variant={"outline"} className="text-nowrap bg-yellow-100 text-yellow-800 text-xs font-medium rounded dark:bg-lighty/5 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-300">
                                  En cours
                                </Badge>
                              ) : todo.completed === 1 ? (
                                <Badge variant={"outline"} className="text-nowrap bg-green-100 text-green-800 text-xs font-medium rounded dark:bg-lighty/5 dark:text-green-300 border border-green-300 dark:border-green-300">
                                  Terminée
                                </Badge>
                              ) : (
                                <Badge variant={"outline"} className="text-nowrap bg-stone-100 text-stone-800 text-xs font-medium rounded dark:bg-lighty/5 dark:text-stone-300 border border-stone-300 dark:border-stone-300">
                                  En attente
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="w-1/6 text-right">
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
                                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(todo)}>
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-500 dark:focus:bg-red-600/30 " onClick={() => handleDelete(todo)}>
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>

                          {/* EDIT DIALOG */}
                          <Dialog open={openEdit}>
                            <DialogOverlay className="bg-black/40" />
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
                              <DialogFooter className="flex md:inline-flex gap-3">
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
                  <Pagination className="relative bottom-0 -my-12 " theme={customPagination} currentPage={currentPage} totalPages={Math.ceil(todos.length / itemsPerPage)} onPageChange={onPageChange} showIcons></Pagination>
                </div>
              ) : (
                <div className="space-y-3">
                  <img src={notFound} alt={notFound} className="w-24 mx-auto animate-not-found" />

                  <p className="text-center">Aucune tâche trouvées.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
