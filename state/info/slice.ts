import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import * as cases from "./actions";
import { InfoState } from "./types";

const initialState: InfoState = {
  infos: []
};

const productsSlice = createSlice({
  name: "infos",
  initialState,
  reducers: {
      infoAdded: cases.infoAddedCase,
      infoRemoved: cases.infoRemovedCase
  }
});

export const { infoAdded, infoRemoved } =
  productsSlice.actions;

export default productsSlice.reducer;
