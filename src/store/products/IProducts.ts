export type ProductData = {
    title: string,
    category: string,
    id: number,
    images: string[],
    price: number,
    stock: number,
    discountPercentage: number,
    rating: number;
    description: string;
    thumbnail: string
}

export type Pagination = {
    skip?: number,
    limit?: number,
}
export type ProductFilters = {
    category?: string,
    sortByPrice?: "ASC" | "DSC",
    searchBy?: string,
    sortByPopularity?: "ASC" | "DSC",
}

export type ProductSearch = {

}

export type ProductsState = {
    productData: ProductData[],
    isLoading: Boolean,
    error: string | null,
    total: number,
    filters: ProductFilters;
} & Pagination;