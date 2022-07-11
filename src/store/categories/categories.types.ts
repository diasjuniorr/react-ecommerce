import { CategoriesDoc } from "../../utils/firebase/firebase.utils";

export enum CategoriesActionTypes {
  FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE",
}

export interface CategoriesReducerAction {
  type: CategoriesActionTypes;
  payload: [] | string;
}

export interface CategoriesState {
  categories: CategoriesDoc[];
  isLoading: boolean;
  error: string | null;
}
