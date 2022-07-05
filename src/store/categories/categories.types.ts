import { CategoriesMap } from "../../shared/interfaces/category.interface";

export enum CategoriesActionTypes {
  loadCategories = "LOAD_CATEGORIES",
}

export interface CategoriesReducerAction {
  type: CategoriesActionTypes;
  payload: {
    categoriesMap: CategoriesMap;
  };
}

export interface CategoriesState {
  categories?: CategoriesMap;
}
