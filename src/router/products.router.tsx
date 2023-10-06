import { RouteObject } from "react-router-dom";
import { PATHS } from "../constants";
import { DefaultLayout } from "../layouts";
import ProductsPage from "../pages/products/products.page";

export const ProductsRoute: RouteObject = {
  element: <DefaultLayout />,
  children: [
    {
      path: PATHS.PRODUCTS,
      element: <ProductsPage />,
    },
  ],
};
