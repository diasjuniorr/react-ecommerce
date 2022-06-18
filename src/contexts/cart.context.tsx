import { createContext, useState } from "react";
import { CartItem } from "../shared/interfaces/products.interface";

interface Props {
  children: React.ReactNode;
}

interface CartContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
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
});

export const Cartprovider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (item: CartItem) => {
    setCartItems(addCartItem(cartItems, item));
  };

  const value = { isOpen, setIsOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
