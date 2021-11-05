import { ResponseResult } from "state/utils/ResponseResult";
import { RequestStatus } from "utils/requestStatus"

export interface UserState {
    email: string,
    isSignedIn: boolean,
    status: RequestStatus,
    error: string,
}

export interface User {
    email: string,
    password: string,
}


export interface UserDTO {
    email: string,
    hash: string,
}

export interface ResponseSignInDTO {
    accessToken: string,
    email: string
}

export interface ResponseSignInResult extends ResponseResult<ResponseSignInDTO> {
    error?: string
}