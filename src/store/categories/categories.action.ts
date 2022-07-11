import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  CategoriesDoc,
  getCategoriesAndDocuemnts,
} from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CategoriesActionTypes } from "./categories.types";

export const setCategories = (categories: CategoriesDoc[]) => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_START, categories);
};

const fetchCategoriesStart = () => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_START, null);
};

const fetchCategoriesSuccess = (payload: CategoriesDoc[]) => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, payload);
};

const fetchCategoriesFailure = (error: string) => {
  return createAction(CategoriesActionTypes.FETCH_CATEGORIES_FAILURE, error);
};

export const fetchCategoriesAsync = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocuemnts();
    if (categories.length < 1) throw new Error("failed to fetch categories");

    dispatch(fetchCategoriesSuccess(categories));
  } catch (err) {
    dispatch(fetchCategoriesFailure(err as string));
  }
};
