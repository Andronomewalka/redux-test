import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "utils/requestStatus";
import * as cases from "./actions";
import * as thunks from "./thunks";
import { ProductState } from "./types";

const initialState: ProductState = {
  products: [],
  status: RequestStatus.Idle,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: cases.productAddedCase,
    productRemoved: cases.productRemovedCase,
    productChanged: cases.productChangedCase,
  },
  extraReducers: (builder) => {
    builder.addCase(thunks.fetchProducts.pending, thunks.fetchProductsActions.pending);
    builder.addCase(thunks.fetchProducts.fulfilled, thunks.fetchProductsActions.fulfilled);
    builder.addCase(thunks.fetchProducts.rejected, thunks.fetchProductsActions.rejected);
  },
});

export const { productAdded, productRemoved, productChanged } =
  productsSlice.actions;

export default productsSlice.reducer;
