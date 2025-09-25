// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7GmulU5ckagHgYs11fhZ7xCup9R7SIHE",
  authDomain: "shikshamitra-94382.firebaseapp.com",
  projectId: "shikshamitra-94382",
  storageBucket: "shikshamitra-94382.firebasestorage.app",
  messagingSenderId: "634839155253",
  appId: "1:634839155253:web:20df1334d3af3d8928677c",
  measurementId: "G-JRWKBT83FC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };