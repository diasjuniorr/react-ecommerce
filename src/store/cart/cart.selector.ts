import { createSelector } from "reselect";
import { CartItem } from "../../shared/interfaces/products.interface";
import { CartState } from "./cart.types";

const selectCart = (state: CartState) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCart],
  (cart) => cart.isOpen
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartTotalPrice(cartItems)
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartTotalItems(cartItems)
);

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
