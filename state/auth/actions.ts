import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { UserState } from './types'

export const validationErrorChangedCase: CaseReducer<UserState, PayloadAction<string>> = (state, action) => {
  state.validationError = action.payload; 
}

export const signOutCase: CaseReducer<UserState, PayloadAction<string>> = (state) => {
  state.isSignedIn = false;
  state.email = "";
}