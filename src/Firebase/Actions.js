import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

// Action to send a message
export const sendMessage = async (chatId, message) => {
    try {
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
            text: message.text,
            createdAt: message.createdAt,
            userId: message.userId,
        });
    } catch (error) {
        console.error("Error sending message: ", error);
    }
};

// Action to fetch messages
export const fetchMessages = async (chatId) => {
    const messages = [];
    try {
        const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Error fetching messages: ", error);
    }
    return messages;
};

// Action to listen for new messages
export const listenForMessages = (chatId, callback) => {
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        callback(messages);
    });
};