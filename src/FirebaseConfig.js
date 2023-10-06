import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASvUkHhXSkFW8kbcMY9CRtHcphLr4CF-c",
  authDomain: "resp-form.firebaseapp.com",
  projectId: "resp-form",
  storageBucket: "resp-form.appspot.com",
  messagingSenderId: "1029857229364",
  appId: "1:1029857229364:web:e8b8cb32c3e1be28b36861",
  measurementId: "G-8XMKQ28TLM"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

const database = getDatabase();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};