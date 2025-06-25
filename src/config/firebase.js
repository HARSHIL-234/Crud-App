// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXDurqBRZr-Q7ho8UP7CabpKyCAWLIFhE",
  authDomain: "crud-app-13920.firebaseapp.com",
  projectId: "crud-app-13920",
  storageBucket: "crud-app-13920.appspot.com",
  messagingSenderId: "544294944200",
  appId: "1:544294944200:web:a5f993501ef418e57fd4fd",
  measurementId: "G-Z8JBQC4M64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export default app; 