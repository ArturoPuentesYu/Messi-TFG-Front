// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDruPcQYNm2oSXBQlUnQVMy6vguJCnZuXY",
  authDomain: "arturo-puentes-tfg.firebaseapp.com",
  projectId: "arturo-puentes-tfg",
  storageBucket: "arturo-puentes-tfg.appspot.com",
  messagingSenderId: "474545780820",
  appId: "1:474545780820:web:f96e5f5f779f08da6755c1",
  measurementId: "G-RLY33S1ZM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);