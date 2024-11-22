import { ProductData } from "../products/IProducts";

export interface CartProducts extends ProductData {
    quantity: number
}

export type CartState = {
    cartProducts: CartProducts[],
    totalPrice: number,
    totalDiscount: number;
    totalDiscountedPrice: number;
    totalQuantity: 0
}