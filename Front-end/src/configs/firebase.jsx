// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5sosYwXJ7CUsGnB4Zis6TE31FSCnUb2g",
  authDomain: "e-channelling-10dc6.firebaseapp.com",
  projectId: "e-channelling-10dc6",
  storageBucket: "e-channelling-10dc6.appspot.com",
  messagingSenderId: "1027529460358",
  appId: "1:1027529460358:web:0b0948d49d4be3ec2d9f07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };