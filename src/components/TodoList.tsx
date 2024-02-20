import React, { useState } from "react";
import { Pagination, Table, Dropdown, TableRow } from "flowbite-react";
import axios from "axios";

interface TodosProps {
  todos: Array<any>;
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

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        // console.log(`Deleted post with ID ${id}`, response);
        window.location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
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
          {visibleTodos.length > 0 ? visibleTodos.map((todo) => (
            <Table.Row key={todo.id} className="bg-white border-b even:bg-zinc-100">
              <Table.Cell scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {todo.id}
              </Table.Cell>
              <Table.Cell className="px-6 py-4">{todo.title}</Table.Cell>
              <Table.Cell className="px-6 py-4">{todo.completed ? "Terminée" : "En cours"}</Table.Cell>
              <Table.Cell className="px-6 py-4 left-0">
                <Dropdown size="sm" label="Edit" dismissOnClick={false} color="gray">
                  <Dropdown.Item>Modifier</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDelete(todo.id)} // Assurez-vous que todo.id est de type number
                    className="bg-red-100 hover:bg-red-200 text-red-500 font-bold"
                  >
                    Supprimer
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          )) : <p className="text-center p-3 w-screen">Aucun Element</p>}
        </Table.Body>
      </Table>
      <div className="text-center my-6">
        <Pagination currentPage={currentPage} totalPages={todos.length / 10} onPageChange={onPageChange} showIcons />
      </div>
    </>
  );
};
