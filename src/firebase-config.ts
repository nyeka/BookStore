import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv-0aRkoeoB-GG8EZoFWjVPvhPos-Vwm8",
  authDomain: "iqrobooks-1764d.firebaseapp.com",
  projectId: "iqrobooks-1764d",
  storageBucket: "iqrobooks-1764d.appspot.com",
  messagingSenderId: "703840011623",
  appId: "1:703840011623:web:fd4acd5c342a05288adbc2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
