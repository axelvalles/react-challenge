// Definir estado del feature de Auth
export interface AuthState {
  isAuth: boolean;
  token: string;
  username: string;
}

export const initialState: AuthState = {
  isAuth: false,
  token: "",
  username: "",
};
