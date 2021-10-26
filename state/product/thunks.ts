import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "utils/client";
import { RequestStatus } from "utils/requestStatus";
import { ThunkActions } from "state/utils/ThunkActions";
import {
  Product, 
  ProductState,
  RequestProductsSearch,
  ResponseProductsSearchResult
} from "./types";
import { selectProductsLimit } from ".";
import { RootState } from "state/store";

export const fetchAllProducts = createAsyncThunk<Product[]>
("products/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await client.get(
      "http://127.0.0.1:3001/products"
    );
    return response;
  } catch (err: any) {
      return rejectWithValue(err?.message ?? "fetching products fucked up");
  }
});

export const fetchAllProductsActions: ThunkActions<ProductState, Product[]> = {
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

export const fetchProductsBySearch = 
createAsyncThunk<ResponseProductsSearchResult, RequestProductsSearch>
("products/fetchProductsBySearch", async (request, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;

    const page = `_page=${request.page}`
    const limit = `_limit=${selectProductsLimit(state)}`
    const name = `name_like=${request.search}`
    const description = `description_like=${request.search}`
    const response: Product[] = await client.get(
      `http://127.0.0.1:3001/products?${page}&${limit}&${name}|${description}`
    );

    const result: ResponseProductsSearchResult = {
      success: true,
      data: response,
      page: request.page
    }
    
    return result;
  } catch (err: any) {
      return rejectWithValue(err?.message ?? "fetching products by search fucked up");
  }
});

export const fetchProductsBySearchActions: 
  ThunkActions<ProductState, ResponseProductsSearchResult> = {
  pending: (state) => {
    state.status = RequestStatus.Requesting;
  },
  fulfilled: (state, action) => {
    state.status = RequestStatus.Succeeded;
    state.products = action.payload.data;
    state.page = action.payload.page;
  },
  rejected: (state, action) => {
    state.status = RequestStatus.Failed;
    state.error = action.payload as string;
  }
}
