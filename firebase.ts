// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsv9JGEvmXOUMpQ2fIFIV8q9YARXY4-ps",
  authDomain: "pantrify-e4ac7.firebaseapp.com",
  projectId: "pantrify-e4ac7",
  storageBucket: "pantrify-e4ac7.appspot.com",
  messagingSenderId: "742888415116",
  appId: "1:742888415116:web:d41d5052587b9a2bbb80a9",
  measurementId: "G-VZRHS7TEE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);