import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./todo.init";

// Creacion del slice el cual controla el estado de la feature del counter
export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.value = [
        ...state.value,
        {
          completed: false,
          title: action.payload,
          id: nanoid(),
        },
      ];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
