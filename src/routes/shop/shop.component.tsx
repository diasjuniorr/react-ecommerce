import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Category from "../../components/category/category/category.component";
import PreviewCategory from "../../components/preview-category/preview-category";
import {
  CategoriesContext,
  CategoriesContextProps,
} from "../../contexts/categories.context";

const Shop = () => {
  const categoriesContext = useContext(
    CategoriesContext
  ) as CategoriesContextProps;
  const { categoriesMap } = categoriesContext;

  return (
    <Routes>
      <Route
        index
        element={<PreviewCategory categoriesMap={categoriesMap} />}
      />
      <Route
        path=":categoryID"
        element={<Category categoriesMap={categoriesMap} />}
      />
    </Routes>
  );
};

export default Shop;
