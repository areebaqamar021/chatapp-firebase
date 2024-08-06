// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const Chat = () => {
  const { currentUser, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const usersQuery = query(collection(db, 'users'));
    const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ uid: doc.id, ...doc.data() });
      });
      setUsers(usersData);
    });
    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const messagesQuery = query(
        collection(db, 'messages', selectedUser.uid, 'chat'),
        orderBy('createdAt')
      );
      const unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesData);
      });
      return () => unsubscribeMessages();
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (message.trim() && currentUser && selectedUser) {
      try {
        console.log('Sending message:', message);
        await addDoc(collection(db, 'messages', selectedUser.uid, 'chat'), {
          text: message,
          uid: currentUser.uid,
          createdAt: serverTimestamp(),
        });
        setMessage('');
        console.log('Message sent successfully');
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    } else {
      if (!currentUser) {
        console.error("User is not authenticated");
      }
      if (!selectedUser) {
        console.error("No user selected");
      }
      if (!message.trim()) {
        console.error("Message is empty");
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <h2 className="text-2xl">Please log in to use the chat application.</h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">SNAPPY</h2>
        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u.uid}
              className={`flex items-center p-2 cursor-pointer rounded ${selectedUser?.uid === u.uid ? 'bg-gray-700' : ''}`}
              onClick={() => setSelectedUser(u)}
            >
              <img
                src={u.avatar || 'default-avatar.png'}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span>{u.name}</span>
            </div>
          ))}
        </div>
        <button
          onClick={logout}
          className="w-full mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="w-3/4 bg-gray-900 text-white flex flex-col">
        <div className="flex items-center p-4 bg-gray-800">
          <img
            src={selectedUser?.avatar || 'default-avatar.png'}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <h2 className="text-xl">{selectedUser?.name}</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={msg.id || index} className={`flex ${msg.uid === currentUser?.uid ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-2 rounded-lg ${msg.uid === currentUser?.uid ? 'bg-blue-500' : 'bg-gray-700'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center p-4 bg-gray-800">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 text-white"
            placeholder="Type your message here"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
