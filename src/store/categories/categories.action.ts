import { CategoriesMap } from "../../shared/interfaces/category.interface";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CategoriesActionTypes } from "./categories.reducer";

export const setCategories = (categoriesMap: CategoriesMap) => {
  return createAction(CategoriesActionTypes.loadCategories, categoriesMap);
};
