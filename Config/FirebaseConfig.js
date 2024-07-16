// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6URPJ8Dbl6z9G9hpIj7AkPTyJm9c3jQg",
  authDomain: "business-app-bf9b1.firebaseapp.com",
  projectId: "business-app-bf9b1",
  storageBucket: "business-app-bf9b1.appspot.com",
  messagingSenderId: "66228224734",
  appId: "1:66228224734:web:369774fa4da4522b0df84f",
  measurementId: "G-EB4SYZH7HZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
