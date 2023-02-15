// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Storage } from "firebase-admin/lib/storage/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUwpP9P-miRZuleEseLkQld3e0CxLVeEg",
  authDomain: "tes-nutech-integrasi.firebaseapp.com",
  projectId: "tes-nutech-integrasi",
  storageBucket: "tes-nutech-integrasi.appspot.com",
  messagingSenderId: "1003326775558",
  appId: "1:1003326775558:web:64ff559eff410c7a9c3e87",
  measurementId: "G-DQBX1Q5F1D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
