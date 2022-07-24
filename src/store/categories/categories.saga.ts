import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  CategoriesDoc,
  getCategoriesAndDocuemnts,
} from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";
import { CategoriesActionTypes } from "./categories.types";

export function* fetchCategoriesAsync(): Generator<any, void, CategoriesDoc[]> {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuemnts);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (err) {
    yield put(fetchCategoriesFailure(err as string));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CategoriesActionTypes.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
