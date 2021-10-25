import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsReducer } from "state/product";
import { authReducer } from "state/auth";
import { infosReducer } from "state/info";
import { pokemonApi } from "state/pokemon";
import { postApi } from "state/post"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    infos: infosReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(pokemonApi.middleware)
    .concat(postApi.middleware),
});

const setupStore = () => store

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);