import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateProductDto, Product } from "../../models";
import { RootState } from "..";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://fakestoreapi.com",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => `/products`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation<Product, CreateProductDto>({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteProduct: builder.mutation<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    getAllCategories: builder.query<string[], void>({
      query: () => `/products/categories`,
    }),
    login: builder.mutation<
      {
        token: "eyJhbGciOiJIUzI1NiIsInR";
      },
      {
        username: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useLoginMutation,
} = productsApi;
