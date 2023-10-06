import { RootState } from "../..";


// Definir selectores
export const selectCounter = (state: RootState) => state.counter.value;
