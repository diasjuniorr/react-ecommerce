import { CartItem } from "../../shared/interfaces/products.interface";

export interface CartState {
  cart: Cart;
}

export interface Cart {
  isOpen: boolean;
  cartItems: CartItem[];
}

export enum CartReducerActionTypes {
  TOGGLE_CART_IS_OPEN = "TOGGLE_CART_IS_OPEN",
  SET_CART_ITEMS = "SET_CART_ITEMS",
}

export interface CartReducerAction {
  type: CartReducerActionTypes;
  payload: CartReducerPayload | null;
}

export interface CartReducerPayload {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
}
