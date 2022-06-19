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
  cartCount: number;
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

export const CartContext = createContext<CartContextProps>({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: (item: CartItem) => {},
  cartCount: 0,
});

export const Cartprovider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (item: CartItem) => {
    setCartItems(addCartItem(cartItems, item));
  };

  useEffect(() => {
    const totalItems = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    setCartCount(totalItems);
  }, [cartItems]);

  const value = { isOpen, setIsOpen, cartItems, addItemToCart, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
