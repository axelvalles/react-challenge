import { localStorageKeys } from "../../../constants";
import { AuthState } from "./auth.init";

export const authPreloadState = (): AuthState => {
  const stringifyAuth = localStorage.getItem(localStorageKeys.auth);

  if (!stringifyAuth) {
    return {
      isAuth: false,
      token: "",
      username: "",
    };
  }

  const auth = JSON.parse(stringifyAuth) as AuthState;

  return auth;
};
