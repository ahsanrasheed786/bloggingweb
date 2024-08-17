// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.FIREBASE,
  authDomain: "my-new-app-11e17.firebaseapp.com",
  databaseURL: "https://my-new-app-11e17.firebaseio.com",
  projectId: "my-new-app-11e17",
  storageBucket: "my-new-app-11e17.appspot.com",
  messagingSenderId: "624597392258",
  appId: "1:624597392258:web:4c8cc92d0a909be8814d9b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);