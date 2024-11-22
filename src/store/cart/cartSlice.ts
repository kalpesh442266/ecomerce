import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { calulateDiscountedPrice } from '../../utils/producUtils';
import { ProductData } from '../products/IProducts';
import { CartProducts, CartState } from './ICart';


// const loadFromLocalStorage = (key: string): any | null => {
//     try {
//         const data = localStorage.getItem(key);
//         if (data) {
//             return JSON.parse(data);
//         }
//         return null;
//     } catch (error) {
//         console.error('Error loading data from localStorage:', error);
//         return null;
//     }
// };


const initialState: CartState = {
    cartProducts: [],
    totalPrice: 0,
    totalDiscountedPrice: 0,
    totalDiscount: 0,
    totalQuantity: 0
}

// const storeCartData = (cartProducts: CartProducts[]) => {
//     localStorage.setItem("cartData", JSON.stringify(cartProducts))
// }


export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCartProduct(state, action: PayloadAction<{ product: ProductData }>) {

            const newProduct = { ...action.payload.product, quantity: 1 };
            const newPrice = Math.floor(newProduct.price);

            state.totalDiscountedPrice += calulateDiscountedPrice(newPrice, newProduct.discountPercentage);
            state.totalPrice += newPrice;

            state.totalDiscount = parseFloat(((state.totalPrice - state.totalDiscountedPrice) / state.totalPrice * 100).toFixed(2));
            state.totalQuantity += 1;

            // find if product exist update quantity else add product with quantity 1
            const isProductExist = state.cartProducts.find(product => product.id === newProduct.id);

            if (isProductExist) {
                state.cartProducts = state.cartProducts.map(product => {
                    if (product.id === newProduct.id) {

                        return { ...product, quantity: (product.quantity || 1) + 1 }
                    } return product;
                })
            } else {
                state.cartProducts.push(newProduct)
            }

        },
        incQuantity(state, action) {
            state.cartProducts = state.cartProducts.map(product => {
                if (product.id === action.payload.id) {
                    product.quantity += 1
                }
                return product;
            })
            state.totalQuantity += 1;
        },
        decQuantity(state, action) {
            state.cartProducts = state.cartProducts.map(product => {
                if (product.id === action.payload.id) {
                    product.quantity -= 1
                }
                return product;
            })
            state.totalQuantity -= 1;

        },
        deleteProduct(state, action) {

            const product = state.cartProducts.filter(product => product.id == action.payload.id)[0];
            const newPrice = Math.floor(product.price);

            state.totalDiscountedPrice -= product.quantity * calulateDiscountedPrice(newPrice, product.discountPercentage);

            state.totalPrice -= product.quantity * newPrice;

            state.totalDiscount = parseFloat(((state.totalPrice - state.totalDiscountedPrice) / state.totalPrice * 100).toFixed(2));

            state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload.id);
            state.totalQuantity -= product.quantity;
        }

    }
})

export const { setCartProduct, incQuantity, decQuantity, deleteProduct } = cartSlice.actions

export default cartSlice.reducer

// tried loading using thunk as well as directly setting initial state data is loading but app does not rerender