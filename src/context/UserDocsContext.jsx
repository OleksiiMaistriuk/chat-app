import { collection, getDocs, query } from "firebase/firestore";
import firebaseService from "firebaseService";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

// @ts-ignore
export const UserDocsContext = createContext();

export const UserDocsContextProvider = ({ children }) => {
  const [currentUserDocs, setCurrentUserDocs] = useState({});

  const userCollectionRef = query(collection(firebaseService.db, "users"));

  const currentUser = useAuthContext();

  useEffect(() => {
    const getCurrentUserDocs = async () => {
      const querySnapshot = await getDocs(userCollectionRef);
      console.log(currentUser.uid);
      querySnapshot.forEach((doc) => {
        if (doc.id === currentUser.uid) {
          const user = doc.data();
          console.log(user);
          setCurrentUserDocs(user);
        }
      });
    };

    getCurrentUserDocs();
  }, [currentUser]);

  console.log(currentUserDocs);

  return (
    <>
      <UserDocsContext.Provider value={currentUserDocs}>
        {children}
      </UserDocsContext.Provider>
    </>
  );
};
export const useUserDocsContext = () => {
  return useContext(UserDocsContext);
};
