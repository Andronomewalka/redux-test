import { RootState } from "state/store";
import { Product } from "./types";

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductById = (id: number | string) => (state: RootState) => 
   state.products.products.filter((product: Product) => product.id === id)[0];

export const selectProductStatusById = (id: number | string) => (state: RootState) => 
   state.products.products.filter((product: Product) => product.id === id)[0].status;

export const selectProductsPage = (state: RootState) => state.products.page;
export const selectProductsLimit = (state: RootState) => state.products.limit;
export const selectProductsSearch = (state: RootState) => state.products.search;
export const selectProductsFetchStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
