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
