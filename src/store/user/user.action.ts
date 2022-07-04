import { UserCredential } from "firebase/auth";
import { createAction } from "../../utils/reducer/reducer.utils";
import { UserActionTypes } from "./user.types";

export const setUser = (user: UserCredential | null) => {
  return createAction(UserActionTypes.SET_USER, user);
};
