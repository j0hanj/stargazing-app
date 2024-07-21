// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-Rk7Bup_cd8ZNfRxHjSV1B-oZI728bAk",
  authDomain: "stargazing-5c669.firebaseapp.com",
  projectId: "stargazing-5c669",
  storageBucket: "stargazing-5c669.appspot.com",
  messagingSenderId: "537767254692",
  appId: "1:537767254692:web:16145278b8c1fb86762431",
  measurementId: "G-ZZCBZ82B7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);