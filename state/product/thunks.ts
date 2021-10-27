import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { client } from "utils/client";
import {
  Product, 
  RequestProductsSearch,
  ResponseProductsSearchResult
} from "./types";
import { selectProductsLimit, selectProductsPage, selectProductsSearch } from ".";
import { RootState } from "state/store";
import { setTimeoutAsync } from "utils/setTimeoutAsync";
import { infoAdded, InfoStatus } from "state/info";

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
      search: request.search,
      page: request.page
    }
    
    return result;
  } catch (err: any) {
      return rejectWithValue(err?.message ?? "fetching products by search fucked up");
  }
});

export const createProduct= 
createAsyncThunk<Product, Product>
("products/createProduct", async (product, { getState, dispatch, rejectWithValue }) => {
  try {
    const state = getState() as RootState;

    product.id = nanoid();
    const {status, ...productTO} = product

    const response = await client.post(
      `http://127.0.0.1:3001/products`, productTO
    );

    if (response === null) 
      throw new Error();

    const lowerSearch = selectProductsSearch(state)?.toLowerCase();
    
    if (!lowerSearch || product.name.toLowerCase().includes(lowerSearch) || 
    product.description.toLowerCase().includes(lowerSearch)) {
      await dispatch(fetchProductsBySearch({ 
        search: lowerSearch,
        page: selectProductsPage(state)
      }))
    }

    dispatch(infoAdded({ text: "Product created", status: InfoStatus.Good }))
    
    return product;
  } catch (err: any) {
    dispatch(infoAdded({ text: "Product created", status: InfoStatus.Bad }))
      return rejectWithValue(err?.message ?? "creating product fucked up");
  }
});

export const updateProduct= 
createAsyncThunk<Product, Product>
("products/updateProduct", async (product, { getState, dispatch, rejectWithValue }) => {
  try {
    dispatch(infoAdded({ text: "Product updating", status: InfoStatus.Pending }))

    const state = getState() as RootState;
    const {status, ...productTO} = product;
    
    const response = await setTimeoutAsync(async () => {
      try {
        return client.put(
          `http://127.0.0.1:3001/products/${productTO.id}`, productTO
        );
      } catch (err: any) {
        return null;
      }
    }, 1500)

    if (response === null) 
      throw new Error();

    const lowerSearch = selectProductsSearch(state)?.toLowerCase();

    if (lowerSearch && !product.name.toLowerCase().includes(lowerSearch) && 
    !product.description.toLowerCase().includes(lowerSearch)) {
      await dispatch(fetchProductsBySearch({ 
        search: lowerSearch,
        page: selectProductsPage(state)
      }))
    }

    dispatch(infoAdded({ text: "Product updated", status: InfoStatus.Good }))
    
    return product;
  } catch (err: any) {
    dispatch(infoAdded({ text: "Product updating fucked up", status: InfoStatus.Bad }))
      return rejectWithValue(err?.message ?? "updating product fucked up");
  }
});

export const deleteProduct= 
createAsyncThunk<Product, Product>
("products/deleteProduct", async (product, { getState, dispatch, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const {status, ...productTO} = product

    const response = await setTimeoutAsync(async () => {
      try {
        return client.delete(
          `http://127.0.0.1:3001/products/${productTO.id}`, productTO
        );
      } catch (err: any) {
        return null;
      }
    }, 1500)

    if (response === null) 
      throw new Error();

    await dispatch(fetchProductsBySearch({ 
      search: selectProductsSearch(state),
      page: selectProductsPage(state)
    }))

    dispatch(infoAdded({ text: "Product deleted", status: InfoStatus.Good }))
    
    return product;
  } catch (err: any) {
      dispatch(infoAdded({ text: "Product deleting fucked up", status: InfoStatus.Bad }))
      return rejectWithValue(err?.message ?? "deleting product fucked up");
  }
});
