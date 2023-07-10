import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnIxRBWBORP5J3fUfUgyGtzHVav2SMvVc",
  authDomain: "chatryt-12c03.firebaseapp.com",
  projectId: "chatryt-12c03",
  storageBucket: "chatryt-12c03.appspot.com",
  messagingSenderId: "770735054274",
  appId: "1:770735054274:web:8e81a103769e60cbc68a5b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);