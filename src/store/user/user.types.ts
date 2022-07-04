import { UserCredential } from "firebase/auth";

export enum UserActionTypes {
  SET_USER = "SET_USER",
}

export interface UserReducerAction {
  type: UserActionTypes;
  payload: UserCredential | null;
}

export interface UserState {
  user: UserCredential | null;
}
