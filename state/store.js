import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "@/state/product";
import { authReducer } from "@/state/auth";

const state = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export default state;
