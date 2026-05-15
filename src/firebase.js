import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB5Bc2EB-87ViEyw_k6Y0dJ0mSh8wWc6o",
  authDomain: "portfolio-22c57.firebaseapp.com",
  projectId: "portfolio-22c57",
  storageBucket: "portfolio-22c57.firebasestorage.app",
  messagingSenderId: "666498735012",
  appId: "1:666498735012:web:27fada03a5166b2574bf31",
  measurementId: "G-EVWG93WY0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, doc, deleteDoc };
