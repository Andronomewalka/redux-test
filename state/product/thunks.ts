import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "utils/client";
import { RequestStatus } from "utils/requestStatus";
import { ThunkActions } from "state/utils/ThunkActions";
import { Product, ProductState } from "./types";

export const fetchProducts = createAsyncThunk<Product[]>
("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    console.log("fetching products");
    const response = await client.get(
      "https://api.github.com/repos/Andronomewalka/redux-test/contents/products.json"
    );
    return JSON.parse(atob(response.content)).slice(0, 10);
  } catch (err: any) {
      return rejectWithValue(err?.message ?? "fetching products fucked up");
  }
});

export const fetchProductsActions: ThunkActions<ProductState, Product[]> = {
  pending: (state) => {
    state.status = RequestStatus.Requesting;
  },
  fulfilled: (state, action) => {
    state.status = RequestStatus.Succeeded;
    state.products = action.payload;
  },
  rejected: (state, action) => {
    state.status = RequestStatus.Failed;
    state.error = action.payload as string;
  }
}
