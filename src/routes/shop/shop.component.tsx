import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Category from "../../components/category/category/category.component";
import PreviewCategory from "../../components/preview-category/preview-category";
import { CategoriesMap } from "../../shared/interfaces/category.interface";
import { setCategories } from "../../store/categories/categories.action";
import { categoriesSelector } from "../../store/categories/categories.selector";
import { getCategoriesAndDocuemnts } from "../../utils/firebase/firebase.utils";

const Shop = () => {
  const dispatch = useDispatch();
  const categoriesMap = useSelector(categoriesSelector) as CategoriesMap;

  useEffect(() => {
    const fetchProducts = async () => {
      const categories = await getCategoriesAndDocuemnts();
      dispatch(setCategories(categories));
    };

    fetchProducts();
  }, []);

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
