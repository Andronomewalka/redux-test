import { nanoid } from "nanoid";

export const productAddedInternal = {
  reducer: (state, action) => {
    try {
      state.products.unshift(action.payload);
    } catch (err) {
      console.log("productAdded reducer err", err);
    }
  },
  prepare: (product) => {
    try {
      product.id = nanoid();
      return { payload: product };
    } catch (err) {
      console.log("productAdded prepare err", err);
    }
  },
};

export const productRemovedInternal = (state, action) => {
  try {
    const productId = action.payload;
    state.products = state.products.filter((cur) => cur.id !== productId);
  } catch (err) {
    console.log("productRemoved err", err);
  }
};

export const productChangedInternal = (state, action) => {
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
