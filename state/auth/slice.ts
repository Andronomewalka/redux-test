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
    builder.addCase(thunks.signIn.pending, thunks.signInActions.pending);
    builder.addCase(thunks.signIn.fulfilled, thunks.signInActions.fulfilled);
    builder.addCase(thunks.signIn.rejected, thunks.signInActions.rejected);
    builder.addCase(thunks.signUp.pending, thunks.signUpActions.pending);
    builder.addCase(thunks.signUp.fulfilled, thunks.signUpActions.fulfilled);
    builder.addCase(thunks.signUp.rejected, thunks.signUpActions.rejected);
    builder.addCase(thunks.fetchLastUsedEmail.pending, thunks.fetchLastUsedEmailActions.pending);
    builder.addCase(thunks.fetchLastUsedEmail.fulfilled, thunks.fetchLastUsedEmailActions.fulfilled);
    builder.addCase(thunks.fetchLastUsedEmail.rejected, thunks.fetchLastUsedEmailActions.rejected);
  }
});

export const { validationErrorChanged, signOut } = auhtSlice.actions;

export default auhtSlice.reducer;
