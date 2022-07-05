import {
  CategoriesActionTypes,
  CategoriesReducerAction,
  CategoriesState,
} from "./categories.types";

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
