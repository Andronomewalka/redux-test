import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { UserState } from './types'

export const errorChangedCase: CaseReducer<UserState, PayloadAction<string>> = (state, action) => {
  state.error = action.payload; 
}

export const signOutCase: CaseReducer<UserState> = (state) => {
  state.email = "";
  state.error = "";
}