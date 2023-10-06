import { RouteObject } from "react-router-dom";
import { PATHS } from "../constants";
import { DefaultLayout } from "../layouts";
import { TodosPage } from "../pages/todos";

export const TodosRoute: RouteObject = {
  element: <DefaultLayout />,
  children: [
    {
      path: PATHS.TODO,
      element: <TodosPage />,
    },
  ],
};
