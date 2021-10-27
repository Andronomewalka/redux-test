import { ResponseResult } from "state/utils/ResponseResult";
import { RequestStatus, RequestStatusExtend } from "utils/requestStatus"
export interface Product {
    id: number | string,
    name: string,
    description: string,
    status?: RequestStatusExtend
}

export interface ProductState {
    products: Product[],
    page: number,
    limit: number,
    maxPages: number,
    search: string,
    status: RequestStatus,
    error: string,
}

export interface ResponseFetchProductsByPageResult extends ResponseResult<Product[]> {
    page: number;
}

export interface RequestProductsSearch {
    search: string,
    page: number
}

export interface ResponseProductsSearchResult extends 
    ResponseResult<Product[]>,
    RequestProductsSearch {
}

