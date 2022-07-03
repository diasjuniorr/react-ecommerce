import { createContext, useReducer } from "react";
import { CartItem } from "../shared/interfaces/products.interface";

interface Props {
  children: React.ReactNode;
}

interface CartContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  removeAllItems: (item: CartItem) => void;
  cartCount: number;
  cartTotal: number;
}

interface CartState {
  isOpen: boolean;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
}

enum CartReducerActionTypes {
  TOGGLE_CART_IS_OPEN = "TOGGLE_CART_IS_OPEN",
  SET_CART_ITEMS = "SET_CART_ITEMS",
}

interface CartReducerAction {
  type: CartReducerActionTypes;
  payload: CartReducerPayload | null;
}

interface CartReducerPayload {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
}

const cartReducer = (state: CartState, action: CartReducerAction) => {
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
      throw new Error("Unhandled action type: " + action.type);
  }
};

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

export const CartContext = createContext<CartContextProps>({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: (item: CartItem) => {},
  removeItemFromCart: (item: CartItem) => {},
  removeAllItems: (item: CartItem) => {},
  cartCount: 0,
  cartTotal: 0,
});

const initialState: CartState = {
  isOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const Cartprovider: React.FC<Props> = ({ children }) => {
  const [{ isOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  const updateCartItemsReducer = (cartItems: CartItem[]) => {
    dispatch({
      type: CartReducerActionTypes.SET_CART_ITEMS,
      payload: {
        cartItems,
        cartTotal: cartTotalPrice(cartItems),
        cartCount: cartTotalItems(cartItems),
      },
    });
  };

  const addItemToCart = (item: CartItem) => {
    const newCartItems = addCartItem(cartItems, item);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (item: CartItem) => {
    const newCartItems = decreaseCartItem(cartItems, item);
    updateCartItemsReducer(newCartItems);
  };

  const removeAllItems = (item: CartItem) => {
    const newCartItems = removeAllMatchingItems(cartItems, item);
    updateCartItemsReducer(newCartItems);
  };

  const setIsOpen = () => {
    dispatch({
      type: CartReducerActionTypes.TOGGLE_CART_IS_OPEN,
      payload: null,
    });
  };

  const value = {
    isOpen,
    setIsOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    removeAllItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
