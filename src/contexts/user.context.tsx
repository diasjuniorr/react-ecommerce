import { UserCredential } from "firebase/auth";
import React from "react";
import { useState } from "react";

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
