import { CategoriesMap } from "../../shared/interfaces/category.interface";

export enum CategoriesActionTypes {
  loadCategories = "LOAD_CATEGORIES",
}

interface CategoriesReducerAction {
  type: CategoriesActionTypes;
  payload: {
    categoriesMap: CategoriesMap;
  };
}

export interface CategoriesState {
  categories?: CategoriesMap;
}

export const categoriesReducer = (
  state: CategoriesState = {},
  action: CategoriesReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CategoriesActionTypes.loadCategories:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
