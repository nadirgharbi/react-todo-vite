import React, { useState } from "react";
import { Pagination, Table, Dropdown, Button } from "flowbite-react";
import axios from "axios";
import { FaDeleteLeft, FaPen } from "react-icons/fa6";
import { BiPlus } from "react-icons/bi";
import notFound from '../assets/not-found.svg'

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

  const handleDelete = (id: string) => {
    console.log(`http://localhost:3000/todos/${id}`);
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
          {" "}
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Tâche N°</Table.HeadCell>
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
                  <Table.Cell className="px-6 py-4">{todo.completed ? "Terminée" : "En cours"}</Table.Cell>
                  <Table.Cell className="px-6 py-4 left-0">
                    <Dropdown size="sm" label="Edit" dismissOnClick={false} color="gray">
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
        </>
      ) : (
        <>
          <p className="text-center">Aucun élement trouvés...</p>
          <img src={notFound} width={420} className="py-5" />
          <Button color="gray">
            <BiPlus />
            Ajouter une nouvelle tâche
          </Button>
        </>
      )}
    </>
  );
};
