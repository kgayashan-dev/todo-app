// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFQArrPdX5wDCAREP0Bwt4vUY7RB3pSj0",
  authDomain: "todo-app-46f75.firebaseapp.com",
  projectId: "todo-app-46f75",
  storageBucket: "todo-app-46f75.appspot.com",
  messagingSenderId: "701518908311",
  appId: "1:701518908311:web:f4134546d716c78d2b12d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
