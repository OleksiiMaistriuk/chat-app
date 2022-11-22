import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const useGlobalContext = () => {
  return useContext(AuthContext);
};
