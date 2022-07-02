import { UserCredential } from "firebase/auth";
import React, { useEffect, useReducer } from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

interface Props {
  children: React.ReactNode;
}

enum UserActionTypes {
  SET_USER = "SET_USER",
}

interface UserReducerAction {
  type: UserActionTypes;
  payload: UserCredential | null;
}

interface UserState {
  user: UserCredential | null;
}

//create reducerUser
const userReducer = (state: UserState, action: UserReducerAction) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      throw new Error("Unhandled action type: " + action.type);
  }
};

interface UserContextProps {
  user: UserCredential | null;
  setUser: (user: UserCredential) => void;
}

export const UserContext = React.createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [{ user }, dispatch] = useReducer(userReducer, { user: null });
  const setUser = (user: UserCredential | null) => {
    dispatch({ type: UserActionTypes.SET_USER, payload: user });
  };
  const value = { user, setUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
