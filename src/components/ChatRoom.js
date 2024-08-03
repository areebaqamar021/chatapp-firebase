// /components/ChatRoom.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firestore } from '../firebase/firebaseConfig';
import { setMessages } from '../redux/chatSlice';

const ChatRoom = () => {
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.chat.activeRoom);

  useEffect(() => {
    if (activeRoom) {
      const unsubscribe = firestore.collection('rooms').doc(activeRoom).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(setMessages(messages));
        });

      return () => unsubscribe();
    }
  }, [activeRoom, dispatch]);

  // Render chat messages
};

export default ChatRoom;
