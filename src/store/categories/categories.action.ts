import { Dispatch } from "react";
import { AnyAction } from "redux";
import { CategoriesDoc } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CategoriesActionTypes } from "./categories.types";

export const setCategories = (categories: CategoriesDoc[]) => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_START, categories);
};

export const fetchCategoriesStart = () => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_START, null);
};

export const fetchCategoriesSuccess = (payload: CategoriesDoc[]) => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, payload);
};

export const fetchCategoriesFailure = (error: string) => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_FAILURE, error);
};
