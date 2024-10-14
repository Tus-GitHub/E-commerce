
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "e-commerce-87a65.firebaseapp.com",
  projectId: "e-commerce-87a65",
  storageBucket: "e-commerce-87a65.appspot.com",
  messagingSenderId: "522866518025",
  appId: "1:522866518025:web:7c77961798d3e9729cb0d8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };