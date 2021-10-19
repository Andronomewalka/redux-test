import { createSlice } from "@reduxjs/toolkit";
import requestStatus from "@/utils/requestStatus";
import {
  productAddedInternal,
  productRemovedInternal,
  productChangedInternal,
} from "./actions";
import { fetchProducts } from "./thunks";

const initialState = {
  products: [],
  status: requestStatus.idle,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: productAddedInternal,
    productRemoved: productRemovedInternal,
    productChanged: productChangedInternal,
  },
  extraReducers: {
    [fetchProducts.pending]: fetchProducts.pendingInternal,
    [fetchProducts.fulfilled]: fetchProducts.fulfilledInternal,
    [fetchProducts.rejected]: fetchProducts.rejectedInternal,
  },
});

export const { productAdded, productRemoved, productChanged } =
  productsSlice.actions;

export default productsSlice.reducer;
