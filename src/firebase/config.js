import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKjai3-FTQfWUqeX9rLQn9fUXwX-txN-k",
  authDomain: "kurma-b3c32.firebaseapp.com",
  projectId: "kurma-b3c32",
  storageBucket: "kurma-b3c32.appspot.com",
  messagingSenderId: "1045887417137",
  appId: "1:1045887417137:web:bcaf29bc583cde464e4e10",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
