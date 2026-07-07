// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHlWgzEHl75r4auXyGnguUQxXKooAmapg",
  authDomain: "otpproviderapihandling.firebaseapp.com",
  projectId: "otpproviderapihandling",
  storageBucket: "otpproviderapihandling.firebasestorage.app",
  messagingSenderId: "77183773832",
  appId: "1:77183773832:web:45d194ae028061021f033d",
  measurementId: "G-6LP3XGD83F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);