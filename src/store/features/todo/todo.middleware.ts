import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, toggleTodo } from "./todo.slice";
import { RootState } from "../..";
import { localStorageKeys } from "../../../constants";

const todoListener = createListenerMiddleware();

todoListener.startListening({
  actionCreator: addTodo,
  effect: (_action, listenerApi) => {
    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    const { todos } = listenerApi.getState() as RootState;

    localStorage.setItem(localStorageKeys.todos, JSON.stringify(todos));
  },
});

todoListener.startListening({
  actionCreator: deleteTodo,
  effect: (_action, listenerApi) => {
    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    const { todos } = listenerApi.getState() as RootState;

    localStorage.setItem(localStorageKeys.todos, JSON.stringify(todos));
  },
});

todoListener.startListening({
  actionCreator: toggleTodo,
  effect: (_action, listenerApi) => {
    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    const { todos } = listenerApi.getState() as RootState;

    localStorage.setItem(localStorageKeys.todos, JSON.stringify(todos));
  },
});

export { todoListener };
