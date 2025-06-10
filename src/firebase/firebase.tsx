import { getDatabase, type Database } from "firebase/database";
import { initializeApp, type FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBA3JxLHr4FXf6j0wmkGRzq8Imyc0UvveU",
  authDomain: "work-3af80.firebaseapp.com",
  databaseURL:
    "https://work-3af80-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "work-3af80",
  storageBucket: "work-3af80.firebasestorage.app",
  messagingSenderId: "837055229217",
  appId: "1:837055229217:web:0499280f5eece8782fa260",
  measurementId: "G-N7LMVBL1B2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db: Database = getDatabase(app);
