import { createSlice, nanoid, PayloadAction, PrepareAction } from "@reduxjs/toolkit";
import { RequestStatus } from "utils/requestStatus";
import * as cases from "./actions";
import * as thunks from "./thunks";
import { Product, ProductState } from "./types";

const initialState: ProductState = {
  products: [],
  status: RequestStatus.Idle,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: {
      reducer: (state: ProductState, action: PayloadAction<Product>) => {
        try {
          state.products.unshift(action.payload);
        } catch (err: any) {
          console.log("productAdded reducer err", err);
        }
      },
      prepare: (product: Product) => {
        product.id = nanoid();
        return { payload: product };
      },
    },
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
