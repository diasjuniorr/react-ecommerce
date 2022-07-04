import { UserActionTypes, UserReducerAction, UserState } from "./user.types";

export const userReducer = (
  state: UserState = { user: null },
  action: UserReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
