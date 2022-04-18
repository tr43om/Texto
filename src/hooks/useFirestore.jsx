import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  doc,
  serverTimestamp,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";

let initialState = {
  document: null,
  error: null,
  isPending: false,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        document: null,
        error: null,
        isPending: true,
        success: false,
      };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        error: null,
        isPending: false,
        success: true,
      };

    case "UPDATED_DOCUMENT":
      return {
        document: null,
        error: null,
        isPending: false,
        success: true,
      };

    case "DELETED_DOCUMENT":
      return {
        document: null,
        error: null,
        isPending: false,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        error: true,
        isPending: false,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (coll) => {
  const [response, dispatch] = useReducer(firestoreReducer, {
    initialState,
  });

  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = collection(db, coll);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (document) => {
    dispatch({ type: "IS_PENDING" });

    try {
      if (coll === "users") {
        await setDoc(doc(ref, document.uid), { ...document });
      } else {
        const createdAt = serverTimestamp();
        const addedDocument = await addDoc(ref, { ...document, createdAt });

        dispatchIfNotCancelled({
          type: "ADDED_DOCUMENT",
          payload: addedDocument,
        });
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // Delete all the replies of a comment
      const repliesRef = collection(db, "replies");
      const q = query(repliesRef, where("commentId", "==", id));

      const querySnapshot = await getDocs(q);

      for await (let reply of querySnapshot.docs) {
        deleteDoc(doc(repliesRef, reply.id));
      }

      // Delete a comment
      await deleteDoc(doc(ref, id));

      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // update a document
  const updateDocument = async (id, document) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await updateDoc(doc(ref, id), { ...document });
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument, updateDocument };
};
