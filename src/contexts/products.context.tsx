import React from "react";
const defaultProducts = require("../shop-data.json")

interface Props {
  children: React.ReactNode;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface ProductsContextProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductsContext = React.createContext<ProductsContextProps | null>(null);

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[]>(defaultProducts);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};
