import {
  CategoriesActionTypes,
  CategoriesReducerAction,
  CategoriesState,
} from "./categories.types";

export const categoriesReducer = (
  state: CategoriesState = { categories: [], isLoading: false, error: null },
  action: CategoriesReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CategoriesActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CategoriesActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
