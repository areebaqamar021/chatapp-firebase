import React from 'react';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Chat from './components/Chat';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? <Chat /> : <Auth />}
    </div>
  );
};

export default App;
