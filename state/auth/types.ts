import { ResponseResult } from "state/utils/ResponseResult";
import { RequestStatus } from "utils/requestStatus"

export interface UserState {
    email: string,
    validationError: string,
    isSignedIn: boolean,
    status: RequestStatus,
    error: string,
}

export interface User {
    email: string,
    password: string,
    isSignedIn?: boolean
}

export interface ResponseSignInResult extends ResponseResult<string> {
    validationError?: string
}
