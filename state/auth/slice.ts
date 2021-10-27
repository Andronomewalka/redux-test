import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "utils/requestStatus";
import { UserState } from './types'
import * as cases from "./actions";
import * as thunks from "./thunks";

const initialState : UserState = {
  email: "",
  validationError: "",
  isSignedIn: false,
  status: RequestStatus.Idle,
  error: "",
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    validationErrorChanged: cases.validationErrorChangedCase,
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
      state.email = response.data;
      state.validationError = "";
      state.isSignedIn = true;
    } else {
      state.validationError = response.validationError ?? "";
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
      state.email = response.data;
      if (response.success) {
        state.validationError = "";
        state.isSignedIn = true;
      } else {
        state.validationError = response.error ?? "";
      }
    });
    builder.addCase(thunks.signUp.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(thunks.fetchLastUsedEmail.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    });
    builder.addCase(thunks.fetchLastUsedEmail.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.email = action.payload;
    });
    builder.addCase(thunks.fetchLastUsedEmail.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });
  }
});

export const { validationErrorChanged, signOut } = auhtSlice.actions;

export default auhtSlice.reducer;
