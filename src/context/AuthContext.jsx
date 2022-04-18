import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
  AUTH_IS_READY: "AUTH_IS_READY",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, user: action.payload };
    case ACTIONS.AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };
    case ACTIONS.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: ACTIONS.AUTH_IS_READY, payload: user });
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
