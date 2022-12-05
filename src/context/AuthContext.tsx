import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext<User | null>(null);

type AuthProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
