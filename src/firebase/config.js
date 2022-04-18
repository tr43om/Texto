import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_2jHwaWcV_MFBu1WujZa2AeZVQxdqFk4",
  authDomain: "interactive-comment-sect-a2a31.firebaseapp.com",
  projectId: "interactive-comment-sect-a2a31",
  storageBucket: "interactive-comment-sect-a2a31.appspot.com",
  messagingSenderId: "410438519024",
  appId: "1:410438519024:web:89873ea3a932f9811b1a35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
