import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Spinner, Flowbite, DarkThemeToggle, Dropdown, Button } from "flowbite-react";
import { TodoList } from "./components/TodoList";
import { BiDotsHorizontalRounded } from "react-icons/bi";

/**
 *
 * json-server : https://www.npmjs.com/package/json-server
 * video json-server : https://www.youtube.com/watch?v=DPjtFcvU6bA
 */

function App() {
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
    
  );
}

export default App;
