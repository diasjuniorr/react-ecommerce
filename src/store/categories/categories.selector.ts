import { createSelector } from "reselect";
import { CategoriesMap } from "../../shared/interfaces/category.interface";
import { CategoriesState } from "./categories.types";

interface State {
  categories: CategoriesState;
}

const selectCategoryReducer = (state: State) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

export const categoriesSelector = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoriesMap);
  }
);
