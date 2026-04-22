import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCB5Bc2EB-87ViEyw_k6Y0dJ0mSh8wWc6o",
    authDomain: "portfolio-22c57.firebaseapp.com",
    projectId: "portfolio-22c57",
    storageBucket: "portfolio-22c57.firebasestorage.app",
    messagingSenderId: "666498735012",
    appId: "1:666498735012:web:27fada03a5166b2574bf31"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };