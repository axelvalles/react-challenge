import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterSlice } from "./features/counter";
import { todoListener, todoSlice, todoPreloadState } from "./features/todo";
import { authListener, authPreloadState, authSlice } from "./features/auth";
import { productsApi } from "./apis/product.api";

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [todoSlice.name]: todoSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    todos: todoPreloadState(),
    auth: authPreloadState(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .prepend(todoListener.middleware)
      .prepend(authListener.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
