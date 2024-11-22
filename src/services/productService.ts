import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pagination, ProductFilters } from "../store/products/IProducts";
import { AppState } from "../store/interfaces";

export const getProductsData = async ({ skip = 0, limit = 20, ...filter }: Pagination & ProductFilters) => {
    let baseString = "https://dummyjson.com/products/";
    baseString = filter.category ? baseString + `category/${filter.category}` : baseString;
    baseString = filter.searchBy ? baseString + `search?q=${filter.searchBy}` : baseString;
    baseString = !filter.searchBy ? baseString + `?` : baseString;
    
    // console.log(filter.searchBy)
    try {
        const data = await axios.get(`${baseString}&limit=${limit}&skip=${skip}`);
        return data.data;
    } catch (e: any) {
        throw {
            message: "Error occured while fetching data",
            status: e.status
        }
    }
}

export const getProducts = createAsyncThunk("products/getProducts", async (params: Pagination & { category?: string }, { getState }) => {
    const currState = getState() as AppState;
    params.category = currState.products?.filters.category ? currState.products?.filters.category : undefined;
    console.log(currState.products?.filters.category);
    const data = await getProductsData(params);
    return data;
})

export const getProduct = async (id: string) => {
    try {
        const data = await axios.get(`https://dummyjson.com/products/${id}`);
        return data.data;
    } catch (e: any) {
        throw {
            message: "Error occured while fetching data",
            status: e.status
        }
    }
}

export const getCategories = async () => {
    try {
        const data = await axios.get("https://dummyjson.com/products/categories");
        return data.data;
    } catch (e: any) {
        throw {
            message: "Error occured while fetching data",
            status: e.status
        }
    }

}
