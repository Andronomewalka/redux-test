import { RootState } from "state/store";
import { Product } from "./types";

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductById = (id: number | string) => (state: RootState) => {
  return state.products.products.filter((product: Product) => product.id === id)[0];
};
export const selectFetchStatus = (state: RootState) => state.products.status;
export const selectError = (state: RootState) => state.products.error;
