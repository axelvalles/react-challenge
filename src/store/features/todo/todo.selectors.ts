import { RootState } from "../..";

// Definir selectores
export const selectTodos = (state: RootState) => state.todos.value;
export const selectTodosToComplete = (state: RootState) =>
  state.todos.value.filter((todo) => !todo.completed).length;
