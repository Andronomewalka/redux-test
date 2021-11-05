import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "utils/requestStatus";
import { UserState } from './types'
import * as cases from "./actions";
import * as thunks from "./thunks";

const initialState : UserState = {
  email: "",
  isSignedIn: false,
  status: RequestStatus.Idle,
  error: "",
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    errorChanged: cases.errorChangedCase,
    signOut: cases.signOutCase
  },
  extraReducers: (builder) => {
    builder.addCase(thunks.signIn.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    });
    builder.addCase(thunks.signIn.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
    const response = action.payload;
    if (response.success) {
      state.email = response.data.email;
      state.error = "";
      state.isSignedIn = true;
    } else {
      state.error = response.error ?? "";
    }
    });
    builder.addCase(thunks.signIn.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(thunks.signUp.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    });
    builder.addCase(thunks.signUp.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      const response = action.payload;
      state.email = response.data.email;
      if (response.success) {
        state.error = "";
        state.isSignedIn = true;
      } else {
        state.error = response.error ?? "";
      }
    });
    builder.addCase(thunks.signUp.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });
  }
});

export const { errorChanged, signOut } = auhtSlice.actions;

export default auhtSlice.reducer;
