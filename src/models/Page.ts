export interface Page<T> {
    page: number,
    maxPage: number,
    elements: T[]
}