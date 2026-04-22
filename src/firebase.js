import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzDu4zb0H3zknEU0SoHia8J8li12ajf5s",
  authDomain: "service-hub-9acb9.firebaseapp.com",
  projectId: "service-hub-9acb9",
  storageBucket: "service-hub-9acb9.firebasestorage.app",
  messagingSenderId: "469889389155",
  appId: "1:469889389155:web:ac3496c52eedf514a4de56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };