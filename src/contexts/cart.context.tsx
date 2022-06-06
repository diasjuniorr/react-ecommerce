import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface CartContextProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CartContext = createContext<CartContextProps>({isOpen: false, setIsOpen: () => {}});

export const Cartprovider:React.FC<Props> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const value = {isOpen, setIsOpen}

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}