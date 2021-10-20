export interface ResponseResult<T> {
    success: boolean,
    data: T,
    error?: string
}