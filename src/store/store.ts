import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import { useDispatch, useSelector } from 'react-redux';
import storage from 'reduxjs-toolkit-persist/lib/storage' // defaults to localStorage for web

const cartPersistConfig = {
    key: 'cartData', // Key for persisted state in storage
    storage,
    whitelist: ['cart'], // Only persist the 'cart' slice
};

const reducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
})

const _persistedReducer = persistReducer(cartPersistConfig, reducer)

const store = configureStore({
    reducer: _persistedReducer,
    devTools: true,
});

export let persistor = persistStore(store);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const dispatch = store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>()
