import { CartItem } from "../../shared/interfaces/products.interface";
import { CartState } from "./cart.types";

export const cartSelectorIsOpen = (state: CartState) => state.cart.isOpen;

export const cartSelector = (state: CartState) => {
  const { cartItems } = state.cart;
  return {
    cartItems,
    cartTotal: cartTotalPrice(cartItems),
    cartCount: cartTotalItems(cartItems),
  };
};

const cartTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.price;
  }, 0);
};

const cartTotalItems = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);
};
