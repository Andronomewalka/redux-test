import { RequestStatus } from "utils/requestStatus"

export interface Product {
    id: number | string,
    name: string,
    description: string
}

export interface ProductState {
    products: Product[],
    status: RequestStatus,
    error: string,
}