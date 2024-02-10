import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyD-6Xzjxyu1eHNwTLQn2aAbmyNcfzWd-pI",
  authDomain: "finance-tracker-bcac9.firebaseapp.com",
  projectId: "finance-tracker-bcac9",
  storageBucket: "finance-tracker-bcac9.appspot.com",
  messagingSenderId: "649135111849",
  appId: "1:649135111849:web:6fb9f09f66600cc260b3b8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
