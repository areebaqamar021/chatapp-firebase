import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import { Input, Button } from 'antd';

const Chat = () => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: message,
        uid: user.uid,
        createdAt: new Date(),
      });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button type="primary" onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default Chat;
