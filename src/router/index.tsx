import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "../constants";
import { CounterRoute } from "./counter.router";
import { TodosRoute } from "./todos.router";
import { ProductsRoute } from "./products.router";
import { LoginRoute } from "./login.router";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <Navigate to={PATHS.COUNTER} />,
  },
  CounterRoute,
  TodosRoute,
  ProductsRoute,
  LoginRoute,
  {
    path: "/*",
    element: <Navigate to={PATHS.COUNTER} />,
  },
]);
