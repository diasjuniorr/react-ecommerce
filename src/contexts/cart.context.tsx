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

//create CartReducerTypes
interface CartState {
  isOpen: boolean;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
}

enum CartReducerActionTypes {
  TOGGLE_CART_IS_OPEN = "TOGGLE_CART_IS_OPEN",
  ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART",
  REMOVE_ALL_ITEMS_FROM_CART = "REMOVE_ALL_ITEMS_FROM_CART",
}

interface CartReducerAction {
  type: CartReducerActionTypes;
  payload: CartItem | null;
}

//create CartReducer
const cartReducer = (state: CartState, action: CartReducerAction) => {
  const { type, payload } = action;
  const { cartItems, isOpen } = state;

  switch (type) {
    case CartReducerActionTypes.TOGGLE_CART_IS_OPEN:
      return { ...state, isOpen: !isOpen };

    case CartReducerActionTypes.ADD_ITEM_TO_CART:
      const cartItemsAdded = addCartItem(cartItems, payload as CartItem);
      return {
        ...state,
        cartItems: cartItemsAdded,
        cartTotal: cartTotalPrice(cartItemsAdded),
        cartCount: cartTotalItems(cartItemsAdded),
      };

    case CartReducerActionTypes.REMOVE_ITEM_FROM_CART:
      const cartItemsDecreased = decreaseCartItem(
        cartItems,
        payload as CartItem
      );
      return {
        ...state,
        cartItems: cartItemsDecreased,
        cartTotal: cartTotalPrice(cartItemsDecreased),
        cartCount: cartTotalItems(cartItemsDecreased),
      };

    case CartReducerActionTypes.REMOVE_ALL_ITEMS_FROM_CART:
      const cartItemsRemovedAllMatches = removeAllMatchingItems(
        cartItems,
        payload as CartItem
      );
      return {
        ...state,
        cartItems: cartItemsRemovedAllMatches,
        cartTotal: cartTotalPrice(cartItemsRemovedAllMatches),
        cartCount: cartTotalItems(cartItemsRemovedAllMatches),
      };
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

export const Cartprovider: React.FC<Props> = ({ children }) => {
  const [{ isOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    {
      isOpen: false,
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,
    } as CartState
  );

  const addItemToCart = (item: CartItem) => {
    dispatch({ type: CartReducerActionTypes.ADD_ITEM_TO_CART, payload: item });
  };

  const removeItemFromCart = (item: CartItem) => {
    dispatch({
      type: CartReducerActionTypes.REMOVE_ITEM_FROM_CART,
      payload: item,
    });
  };

  const removeAllItems = (item: CartItem) => {
    dispatch({
      type: CartReducerActionTypes.REMOVE_ALL_ITEMS_FROM_CART,
      payload: item,
    });
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
