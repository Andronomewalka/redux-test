import { ResponseResult } from "state/utils/ResponseResult";
import { RequestStatus } from "utils/requestStatus"

export interface Product {
    id: number | string,
    name: string,
    description: string
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

interface ProductsPageSearch { 
    page: number;
}

export interface RequestProductsSearch extends ProductsPageSearch {
    search: string,
}

export interface ResponseProductsSearchResult extends 
    ResponseResult<Product[]>,
    ProductsPageSearch {
}

