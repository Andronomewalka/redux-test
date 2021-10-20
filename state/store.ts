import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsReducer } from "state/product";
import { authReducer } from "state/auth";
import { pokemonApi } from "state/pokemon";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

const setupStore = () => store

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch);
