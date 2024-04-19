export interface OptionalResponse<T> {
    success: boolean,
    errorMessage?: string,
    data?: T
}