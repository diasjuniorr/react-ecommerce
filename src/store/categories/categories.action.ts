import { CategoriesDoc } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CategoriesActionTypes } from "./categories.types";

export const setCategories = (categories: CategoriesDoc[]) => {
  return createAction(CategoriesActionTypes.loadCategories, categories);
};
