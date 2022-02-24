import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: ***,
    authDomain: ***,
    projectId: ***,
    storageBucket: ***,
    messagingSenderId: ***,
    appId: ***,
    measurementId: ***
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getDatabase();

export { auth, db }