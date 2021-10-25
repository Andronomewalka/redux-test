import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { Product, ProductState } from './types'
import { nanoid } from "nanoid";

export const productAddedCase : {
  reducer: (state: ProductState, action: PayloadAction<Product>) => void;
  prepare: (info: Product) => {
      payload: Product;
  };
} = {
  reducer: (state: any, action: any) => {
    try {
      state.products.unshift(action.payload);
    } catch (err: any) {
      console.log("productAdded reducer err", err);
    }
  },
  prepare: (product: Product) => {
    try {
      product.id = nanoid();
    } catch (err) {
      console.log("productAdded prepare err", err);
    }
    return { payload: product };
  },
};

export const productRemovedCase: CaseReducer<ProductState, PayloadAction<number | string>> = (state, action) => {
  try {
    const productId = action.payload;
    state.products = state.products.filter((cur) => cur.id !== productId);
  } catch (err) {
    console.log("productRemoved err", err);
  }
};

export const productChangedCase: CaseReducer<ProductState, PayloadAction<Product>> = (state, action) => {
  try {
    const product = action.payload;
    const productIndex = state.products.findIndex(
      (cur) => cur.id === product.id
    );
    state.products[productIndex] = product;
  } catch (err) {
    console.log("productChanged err", err);
  }
};
