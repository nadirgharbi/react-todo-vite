import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { Spinner } from "flowbite-react";
import { TodoList } from "./components/TodoList";

/**
 * 
 * json-server : https://www.npmjs.com/package/json-server 
 * video json-server : https://www.youtube.com/watch?v=DPjtFcvU6bA
 */

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((result: AxiosResponse) => {
      setTodos(result.data)
    })
    
  }, [])

  return (
    <div className="p-5">
      <div className="text-center text-zinc-800">
        <h1 className="text-3xl font-bold">My Todo list</h1>
      </div>
      <div className="py-5 text-center">
        {todos ? <TodoList todos={todos}/>: <Spinner />}
      </div>
    </div>
  );
}

export default App;
