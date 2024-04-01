import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5xxdOGw0F3XqewDMHBty2oaFHah5g6-s",
  authDomain: "test-fire-f0457.firebaseapp.com",
  projectId: "test-fire-f0457",
  storageBucket: "test-fire-f0457.appspot.com",
  messagingSenderId: "565078983685",
  appId: "1:565078983685:web:a624ebea0c29536006086c",
  measurementId: "G-HDTDKC90MD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
