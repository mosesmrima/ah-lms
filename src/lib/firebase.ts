import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0g9XkaGWdLHpYXUWfayAWGztS70Lr0S8",
  authDomain: "ahlms-ddef5.firebaseapp.com",
  projectId: "ahlms-ddef5",
  storageBucket: "ahlms-ddef5.firebasestorage.app",
  messagingSenderId: "591009406199",
  appId: "1:591009406199:web:6c1f05e2096d7a2780c7f2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 
