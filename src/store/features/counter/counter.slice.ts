import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./counter.init";

// Creacion del slice el cual controla el estado de la feature del counter
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.value += 1;
    },
    decrementCounter: (state) => {
      state.value -= 1;
    },
    incrementCounterByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    duplicateCounter: (state) => {
      state.value *= 2;
    },
    divideCounter: (state) => {
      if (state.value !== 0) {
        state.value /= 2;
      }
    },
  },
});

export const {
  incrementCounter,
  decrementCounter,
  incrementCounterByAmount,
  divideCounter,
  duplicateCounter,
} = counterSlice.actions;
