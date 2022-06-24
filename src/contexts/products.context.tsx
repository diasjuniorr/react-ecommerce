import React, { useEffect, useState } from "react";
import { getCategoriesAndDocuemnts } from "../utils/firebase/firebase.utils";
const defaultProducts = require("../shop-data.json");

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

export const ProductsContext = React.createContext<ProductsContextProps | null>(
  null
);

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const value = { products, setProducts };

  useEffect(() => {
    const fetchProducts = async () => {
      const categories = await getCategoriesAndDocuemnts();
      const products = [];

      for (let key in categories) {
        products.push(...categories[key]);
      }

      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
