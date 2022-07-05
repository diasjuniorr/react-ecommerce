import {
  CategoriesActionTypes,
  CategoriesReducerAction,
  CategoriesState,
} from "./categories.types";

export const categoriesReducer = (
  state: CategoriesState = { categories: [] },
  action: CategoriesReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CategoriesActionTypes.loadCategories:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
