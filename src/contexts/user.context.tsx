import { UserCredential } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  user: UserCredential | null;
  setUser: React.Dispatch<React.SetStateAction<UserCredential | null>>;
}

export const UserContext = React.createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserCredential | null>(null);
  const value = { user, setUser };

  useEffect(() => {
    onAuthStateChangedListener((user)=>{
      setUser(user)
    });
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
