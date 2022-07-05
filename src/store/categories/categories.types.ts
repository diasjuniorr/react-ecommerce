import { CategoriesDoc } from "../../utils/firebase/firebase.utils";

export enum CategoriesActionTypes {
  loadCategories = "SET_CATEGORIES",
}

export interface CategoriesReducerAction {
  type: CategoriesActionTypes;
  payload: [];
}

export interface CategoriesState {
  categories: CategoriesDoc[];
}
