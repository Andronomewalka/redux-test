import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/utils/client";
import requestStatus from "@/utils/requestStatus";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetching products");
      const response = await client.get(
        "https://api.github.com/repos/Andronomewalka/redux-test/contents/products.json"
      );
      return JSON.parse(atob(response.content)).slice(0, 10);
    } catch (err) {
      return rejectWithValue(err?.message ?? "fetching products fucked up");
    }
  }
);

fetchProducts.pendingInternal = (state, action) => {
  state.status = requestStatus.loading;
};

fetchProducts.fulfilledInternal = (state, action) => {
  state.status = requestStatus.succeeded;
  state.products = action.payload;
};

fetchProducts.rejectedInternal = (state, action) => {
  state.status = requestStatus.failed;
  state.error = action.error.message;
};
