import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCMsP4Dp3hUHRweI8grtNoeMOKpn5wyg6c",
    authDomain: "login-auth-d69c3.firebaseapp.com",
    projectId: "login-auth-d69c3",
    storageBucket: "login-auth-d69c3.appspot.com",
    messagingSenderId: "584090562976",
    appId: "1:584090562976:web:ca13bc61273a3d204b74c5",
    measurementId: "G-80LW3M0WF6"
  };
  

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
