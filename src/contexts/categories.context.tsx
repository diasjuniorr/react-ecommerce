import React, { useEffect, useState } from "react";
import { CategoriesMap } from "../shared/interfaces/category.interface";
import { getCategoriesAndDocuemnts } from "../utils/firebase/firebase.utils";

interface Props {
  children: React.ReactNode;
}

export interface CategoriesContextProps {
  categoriesMap: CategoriesMap;
  setCategoriesMap: React.Dispatch<React.SetStateAction<CategoriesMap>>;
}

export const CategoriesContext =
  React.createContext<CategoriesContextProps | null>(null);

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState<CategoriesMap>(
    {} as CategoriesMap
  );
  const value = { categoriesMap, setCategoriesMap };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const categories = await getCategoriesAndDocuemnts();
  //     setCategoriesMap(categories);
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
