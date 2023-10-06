import { createListenerMiddleware } from "@reduxjs/toolkit";

import { RootState } from "../..";
import { localStorageKeys } from "../../../constants";
import { login, logout } from "./auth.slice";

const authListener = createListenerMiddleware();

authListener.startListening({
  actionCreator: login,
  effect: (_action, listenerApi) => {
    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    const { auth } = listenerApi.getState() as RootState;

    localStorage.setItem(localStorageKeys.auth, JSON.stringify(auth));
  },
});

authListener.startListening({
  actionCreator: logout,
  effect: (_action, listenerApi) => {
    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    localStorage.removeItem(localStorageKeys.auth);
  },
});

export { authListener };
