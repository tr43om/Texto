import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { ACTIONS } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { addDocument } = useFirestore("users");
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setIsPending(true);
    setError(null);

    try {
      // sign up user
      await createUserWithEmailAndPassword(auth, email, password);

      // add display name to user
      await updateProfile(auth.currentUser, { displayName });

      // add user to 'users' collection
      await addDocument({
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        uid: auth.currentUser.uid,
      });

      // dispatch login action
      dispatch({ type: ACTIONS.LOGIN, payload: auth.currentUser });

      // If component is NOT unmounted, update states
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
