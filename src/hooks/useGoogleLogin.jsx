import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ACTIONS } from "../context/AuthContext";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";
import { collection, getDocs } from "firebase/firestore";

export const useGoogleLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { addDocument } = useFirestore("users");
  const { dispatch } = useAuthContext();

  const loginWithGoogle = async () => {
    setIsPending(true);
    setError(null);

    try {
      // show pop up window with user's  accounts to sign in
      await signInWithPopup(auth, new GoogleAuthProvider());

      // add user to 'users' collection IF there is no users with logged in uid
      const users = await getDocs(collection(db, "users"));

      if (
        users.docs.every((user) => auth.currentUser.uid !== user.data().uid)
      ) {
        await addDocument({
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
        });
      }

      // dispatch login action
      dispatch({ type: ACTIONS.LOGIN, payload: auth.currentUser });

      // If component is NOT unmounted, update states
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      console.log(auth.AuthCredentials);

      if (!isCancelled) {
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, loginWithGoogle };
};
