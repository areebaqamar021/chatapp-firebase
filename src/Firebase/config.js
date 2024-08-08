import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMsP4Dp3hUHRweI8grtNoeMOKpn5wyg6c",
  authDomain: "login-auth-d69c3.firebaseapp.com",
  projectId: "login-auth-d69c3",
  storageBucket: "login-auth-d69c3.appspot.com",
  messagingSenderId: "584090562976",
  appId: "1:584090562976:web:ca13bc61273a3d204b74c5",
  measurementId: "G-80LW3M0WF6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("No user is signed in.");
  }
});


