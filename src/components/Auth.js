// src/components/Auth.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button, Input } from 'antd';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      dispatch(setUser(userCredential.user));
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="primary" onClick={handleAuth}>{isSignUp ? 'Sign Up' : 'Login'}</Button>
      <Button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
      </Button>
    </div>
  );
};

export default Auth;
