// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const Chat = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const usersQuery = query(collection(db, 'users'));
    const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
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
          messagesData.push(doc.data());
        });
        setMessages(messagesData);
      });
      return () => unsubscribeMessages();
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (message.trim() && user) {
      try {
        await addDoc(collection(db, 'messages', selectedUser.uid, 'chat'), {
          text: message,
          uid: user.uid,
          createdAt: serverTimestamp(),
        });
        setMessage('');
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    } else {
      console.error("User is not authenticated or message is empty");
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <h2 className="text-2xl">Please log in to use the chat application.</h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">SNAPPY</h2>
        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u.uid}
              className={`flex items-center p-2 cursor-pointer rounded ${
                selectedUser?.uid === u.uid ? 'bg-gray-700' : ''
              }`}
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
      </div>

      {/* Chat Area */}
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
            <div
              key={index}
              className={`flex ${
                msg.uid === user?.uid ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  msg.uid === user?.uid ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
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
