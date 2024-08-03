// /components/Auth.js
import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Auth = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      dispatch(setUser(result.user));
    });
  };

  return <button onClick={signIn}>Sign In with Google</button>;
};

export default Auth;
