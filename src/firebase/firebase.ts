import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDp83xQK6vJVVfByTh_nE3-OS0BpUaUdS0",
  authDomain: "chat-f8b83.firebaseapp.com",
  projectId: "chat-f8b83",
  storageBucket: "chat-f8b83.appspot.com",
  messagingSenderId: "969437848709",
  appId: "1:969437848709:web:664e0af9ee0baef83875ec",
  measurementId: "G-L9S0CYCB3F",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

// export const storage = getStorage();
