import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { createElement } from "react";
import { TodoList } from "./components/TodoList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App),
    children: [
      {
        path: "/",
        element: createElement(TodoList),
      },
      {
        path: "/login",
        element: createElement(Login),
      },
      {
        path: "/register",
        element: createElement(Register),
      },
    ],
  },
]);
