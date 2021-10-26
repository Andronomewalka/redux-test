import { createSlice, } from "@reduxjs/toolkit";
import { RequestStatus } from "utils/requestStatus";
import * as cases from "./actions";
import * as thunks from "./thunks";
import { ProductState } from "./types";

const initialState: ProductState = {
  products: [],
  page: 1,
  limit: 4,
  maxPages: 10,
  search: "google",
  status: RequestStatus.Idle,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: cases.productAddedCase,
    productRemoved: cases.productRemovedCase,
    productChanged: cases.productChangedCase
  },
  extraReducers: (builder) => {
    builder.addCase(thunks.fetchAllProducts.pending, thunks.fetchAllProductsActions.pending);
    builder.addCase(thunks.fetchAllProducts.fulfilled, thunks.fetchAllProductsActions.fulfilled);
    builder.addCase(thunks.fetchAllProducts.rejected, thunks.fetchAllProductsActions.rejected);
    builder.addCase(thunks.fetchProductsBySearch.pending, thunks.fetchProductsBySearchActions.pending);
    builder.addCase(thunks.fetchProductsBySearch.fulfilled, thunks.fetchProductsBySearchActions.fulfilled);
    builder.addCase(thunks.fetchProductsBySearch.rejected, thunks.fetchProductsBySearchActions.rejected);
  },
});

export const { 
  productAdded, 
  productRemoved,
  productChanged,
} = productsSlice.actions;

export default productsSlice.reducer;
