import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../services/productService';
import { ProductData, ProductsState } from './IProducts';


const initialState: ProductsState = {
    productData: [],
    skip: 0,
    limit: 10,
    error: null,
    isLoading: false,
    total: 2,

    filters: {
        category: "",
        sortByPrice: "ASC",
        sortByPopularity: "ASC",
        searchBy: ""
    },
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            state.productData = action.payload.data.products;
            state.total = action.payload.data.total;
        },
        setInbuiltFilters(state, action) {
            state.productData = [];
            state.filters = { ...state.filters, [action.payload.key]: action.payload.value }
            state.total = 0;
        },

        setExternalFilters(state, action) {
            // for filters on existing products
            switch (action.payload) {
                case "sortByPopularity_ASC": {
                    state.productData = state.productData.sort((a: ProductData, b: ProductData) => {
                        if (a.rating < b.rating) return -1;
                        if (a.rating > b.rating) return 1;
                        return 0;
                    })
                    break;
                };
                case "sortByPopularity_DSC": {
                    state.productData = state.productData.sort((a: ProductData, b: ProductData) => {
                        if (a.rating > b.rating) return -1;
                        if (a.rating < b.rating) return 1;
                        return 0;
                    })
                    break;
                };
                case "sortByPrice_ASC": {
                    state.productData = state.productData.sort((a: ProductData, b: ProductData) => {
                        if (a.price < b.price) return -1;
                        if (a.price > b.price) return 1;
                        return 0;
                    })
                    break;
                };
                case "sortByPrice_DSC": {
                    state.productData = state.productData.sort((a: ProductData, b: ProductData) => {
                        if (a.price > b.price) return -1;
                        if (a.price < b.price) return 1;
                        return 0;
                    })
                    break;
                }
            }
        }

    },
    extraReducers(builder) {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productData = [...state.productData, ...action.payload.products];
            state.skip = action.payload.skip > action.payload.total ? action.payload.total : action.payload.skip;
            state.total = action.payload.total;
        })
    }
})

export const { setData, setInbuiltFilters, setExternalFilters } = productsSlice.actions

export default productsSlice.reducer
