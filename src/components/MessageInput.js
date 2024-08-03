// /components/MessageInput.js
import React, { useState } from 'react';
import { storage, firestore } from '../firebase/firebaseConfig';

const MessageInput = ({ roomId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendMessage = () => {
    if (file) {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => console.error(error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            firestore.collection('rooms').doc(roomId).collection('messages').add({
              content: url,
              sender: 'currentUser', // Replace with actual user data
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
