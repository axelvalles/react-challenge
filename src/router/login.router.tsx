import { RouteObject } from "react-router-dom";
import { PATHS } from "../constants";
import { DefaultLayout } from "../layouts";
import LoginPage from "../pages/login/login.page";

export const LoginRoute: RouteObject = {
  element: <DefaultLayout />,
  children: [
    {
      path: PATHS.LOGIN,
      element: <LoginPage />,
    },
  ],
};
