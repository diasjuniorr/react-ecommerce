import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Category from "../../components/category/category/category.component";
import PreviewCategory from "../../components/preview-category/preview-category";
import { CategoriesMap } from "../../shared/interfaces/category.interface";
import { categoriesSelector } from "../../store/categories/categories.selector";

const Shop = () => {
  const categoriesMap = useSelector(categoriesSelector) as CategoriesMap;
  console.log("categoriesMap", categoriesMap);

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
