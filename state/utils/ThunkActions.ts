import { PayloadAction } from "@reduxjs/toolkit"

export interface ThunkActions<State, PayloadType> {
    pending(state: State): void,
    fulfilled(state: State, action: PayloadAction<PayloadType>): void,
    rejected(state: State, action: PayloadAction<unknown>): void
}