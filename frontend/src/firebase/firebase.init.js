// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdicC5rd--Ozn1Io2djkwOHU1m6hLQQEQ",
  authDomain: "medinex-323b4.firebaseapp.com",
  projectId: "medinex-323b4",
  storageBucket: "medinex-323b4.firebasestorage.app",
  messagingSenderId: "708513452769",
  appId: "1:708513452769:web:de78941025d369a4c3dda0",
  measurementId: "G-P0GQ51VR5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export default app;