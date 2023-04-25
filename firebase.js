// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoOOqm4AzDiAQxjXegs60WrVUhx5G07O0",
  authDomain: "jabbarmedium.firebaseapp.com",
  projectId: "jabbarmedium",
  storageBucket: "jabbarmedium.appspot.com",
  messagingSenderId: "356943020302",
  appId: "1:356943020302:web:18dcd19e8600137794575f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
