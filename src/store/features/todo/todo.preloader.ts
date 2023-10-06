import { localStorageKeys } from "../../../constants";
import { TodoState } from "./todo.init";

export const todoPreloadState = (): TodoState => {
  const stringifyTodos = localStorage.getItem(localStorageKeys.todos);

  if (!stringifyTodos) {
    return {
      value: [],
    };
  }

  const todos = JSON.parse(stringifyTodos);

  return todos;
};
