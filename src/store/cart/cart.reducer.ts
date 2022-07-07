import { CartReducerAction, CartReducerActionTypes } from "./cart.types";

const initialCart = {
  isOpen: false,
  cartItems: [],
};

export const cartReducer = (state = initialCart, action: CartReducerAction) => {
  const { type, payload } = action;
  const { isOpen } = state;

  switch (type) {
    case CartReducerActionTypes.TOGGLE_CART_IS_OPEN:
      return { ...state, isOpen: !isOpen };

    case CartReducerActionTypes.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
