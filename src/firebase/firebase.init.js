// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUq8XsesFq35HEfkyO1GeesUA3iTZdEio",
  authDomain: "email-pass-auth-c2f2f.firebaseapp.com",
  projectId: "email-pass-auth-c2f2f",
  storageBucket: "email-pass-auth-c2f2f.firebasestorage.app",
  messagingSenderId: "578431052137",
  appId: "1:578431052137:web:4689f8d17cb7a31aecf5f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
