import { CaseReducer, createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { RequestStatus } from "utils/requestStatus";
import * as cases from "./actions";
import * as thunks from "./thunks";
import { ProductState } from "./types";

export const shitTest: CaseReducer<ProductState, PayloadAction<string>> = (state, action) => {
  try {
    const productId = action.payload;
    state.products = state.products.filter((cur) => cur.id !== productId);
  } catch (err) {
    console.log("productRemoved err", err);
  }
};

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
    //Fetch all
    builder.addCase(thunks.fetchAllProducts.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    });
    builder.addCase(thunks.fetchAllProducts.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.products = action.payload;
      state.search = "";
    });
    builder.addCase(thunks.fetchAllProducts.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    //Search
    builder.addCase(thunks.fetchProductsBySearch.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    });
    builder.addCase(thunks.fetchProductsBySearch.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.products = action.payload.data;
      state.search = action.payload.search;
      state.page = action.payload.page;
    });
    builder.addCase(thunks.fetchProductsBySearch.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    //Update
    builder.addCase(thunks.updateProduct.pending, (state, action) => {
      const requestedProduct =  action.meta.arg;
      const productIndex = state.products.findIndex(
        (cur) => cur.id === requestedProduct.id
      );
      state.products[productIndex].status = {
        state: RequestStatus.Requesting,
        text: 'Product updating' 
      };
    });
    builder.addCase(thunks.updateProduct.fulfilled, (state, action) => {
      const product = action.payload;
      product.status = {
        state: RequestStatus.Succeeded,
        text: 'Product updated' 
      };
      const productIndex = state.products.findIndex(
        (cur) => cur.id === product.id
      );
      state.products[productIndex] = product;
    });

    //Delete
    builder.addCase(thunks.deleteProduct.pending, (state, action) => {
      const requestedProduct =  action.meta.arg;
      const productIndex = state.products.findIndex(
        (cur) => cur.id === requestedProduct.id
      );
      state.products[productIndex].status = {
        state: RequestStatus.Requesting,
        text: 'Product deleting' 
      };
    });
  },
});

export const { 
  productAdded, 
  productRemoved,
  productChanged,
} = productsSlice.actions;

export default productsSlice.reducer;
