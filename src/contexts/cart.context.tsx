import { createContext, useEffect, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (item: CartItem) => {
    setCartItems(addCartItem(cartItems, item));
  };

  const removeItemFromCart = (item: CartItem) => {
    setCartItems(decreaseCartItem(cartItems, item));
  };

  const removeAllItems = (item: CartItem) => {
    setCartItems(removeAllMatchingItems(cartItems, item));
  };

  useEffect(() => {
    const totalItems = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    setCartCount(totalItems);
    setCartTotal(cartTotalPrice(cartItems));
  }, [cartItems]);

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
