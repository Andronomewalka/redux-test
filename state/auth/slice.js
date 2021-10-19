import { createSlice } from "@reduxjs/toolkit";
import requestStatus from "@/utils/requestStatus";
import { validationErrorChangedInternal, signOutInternal } from "./actions";
import { signIn, signUp, fetchLastUsedEmail } from "./thunks";

const initialState = {
  email: "",
  validationError: "",
  isSignedIn: false,
  status: requestStatus.idle,
  error: "",
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    validationErrorChanged: validationErrorChangedInternal,
    signOut: signOutInternal,
  },
  extraReducers: {
    [signIn.pending]: signIn.pendingInternal,
    [signIn.fulfilled]: signIn.fulfilledInternal,
    [signIn.rejected]: signIn.rejectedInternal,
    [signUp.pending]: signUp.pendingInternal,
    [signUp.fulfilled]: signUp.fulfilledInternal,
    [signUp.rejected]: signUp.rejectedInternal,
    [fetchLastUsedEmail.pending]: fetchLastUsedEmail.pendingInternal,
    [fetchLastUsedEmail.fulfilled]: fetchLastUsedEmail.fulfilledInternal,
    [fetchLastUsedEmail.rejected]: fetchLastUsedEmail.rejectedInternal,
  },
});

export const { validationErrorChanged, signOut } = auhtSlice.actions;

export default auhtSlice.reducer;
