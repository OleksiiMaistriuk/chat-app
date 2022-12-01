import { createContext, useContext, useReducer } from "react";
import { useAuthContext } from "./AuthContext";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
  // @ts-ignore
  const { currentUser } = useAuthContext();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (
    state: any,
    action: { type: any; payload: any }
  ): any => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <>
      <UserContext.Provider value={{ data: state, dispatch }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
