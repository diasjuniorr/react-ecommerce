import { useContext } from "react";
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

  return <PreviewCategory categoriesMap={categoriesMap} />;
};

export default Shop;
