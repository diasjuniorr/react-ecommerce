import { CartItem } from "../../shared/interfaces/products.interface";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CartReducerActionTypes } from "./cart.types";

const addCartItem = (cartItems: CartItem[], item: CartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...item, quantity: 1 }];
};

const decreaseCartItem = (cartItems: CartItem[], item: CartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  if (!existingCartItem) return cartItems;

  if (existingCartItem.quantity === 1) {
    return removeAllMatchingItems(cartItems, item);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeAllMatchingItems = (cartItems: CartItem[], item: CartItem) => {
  return cartItems.filter((cartItem) => {
    return cartItem.id !== item.id;
  });
};

export const addItemToCart = (cartItems: CartItem[], item: CartItem) => {
  const newCartItems = addCartItem(cartItems, item);
  return createAction(CartReducerActionTypes.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};

export const removeItemFromCart = (cartItems: CartItem[], item: CartItem) => {
  const newCartItems = decreaseCartItem(cartItems, item);
  return createAction(CartReducerActionTypes.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};

export const removeAllItems = (cartItems: CartItem[], item: CartItem) => {
  const newCartItems = removeAllMatchingItems(cartItems, item);
  return createAction(CartReducerActionTypes.SET_CART_ITEMS, {
    cartItems: newCartItems,
  });
};

export const setIsOpen = () => {
  return createAction(CartReducerActionTypes.TOGGLE_CART_IS_OPEN, null);
};
