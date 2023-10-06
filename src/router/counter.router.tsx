import { RouteObject } from "react-router-dom";
import { PATHS } from "../constants";
import CounterPage from "../pages/counter/counter.page";
import { DefaultLayout } from "../layouts";

export const CounterRoute: RouteObject = {
  element: <DefaultLayout />,
  children: [
    {
      path: PATHS.COUNTER,
      element: <CounterPage />,
    },
  ],
};
