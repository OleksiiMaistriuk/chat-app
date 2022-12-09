import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseService/firebaseService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <AuthContext.Provider value={currentUser}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
