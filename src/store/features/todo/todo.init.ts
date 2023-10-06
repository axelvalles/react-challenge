import { Todo } from "../../../models";

// Definir estado del feature de Todo
export interface TodoState {
  value: Todo[];
}

export const initialState: TodoState = {
  value: [],
};
