import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./auth.init";

// Creacion del slice el cual controla el estado de la feature del auth
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; username: string }>
    ) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = "";
      state.username = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
