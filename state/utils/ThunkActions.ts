import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/internal";
import { UserState } from "state/auth";

export interface ThunkActions<State, PayloadType> {
    pending(state: any, action: any): void,
    fulfilled(state:any, action: any): void,
    //fulfilled(state: WritableDraft<State>, action: PayloadAction<PayloadType>): void,
    rejected(state: any, action: any): void
}