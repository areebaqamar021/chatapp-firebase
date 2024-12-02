import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../Firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { setIds } from "../../redux/chat/utils";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const [chatUsersList, setChatUsersList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { chatRoms, userChats } = useSelector((state) => state.chat);

  useEffect(() => {
    if (!user?.uid || !chatRoms || !userChats || !users) return;

    const usersIdsArr = userChats.flatMap((userChatId) =>
      (chatRoms[userChatId]?.chatRomOwners || [])
        .filter((userId) => user?.uid !== userId)
        .map((userId) => ({ userId, userChatId }))
    );

    const userList = usersIdsArr
      .map(({ userId, userChatId }) => ({
        user: users.find((user) => user?.uid === userId),
        userChatId,
      }))
      .filter(({ user }) => user !== undefined);

    const filteredUserList = userList.sort((a, b) => {
      const lastChatA =
        chatRoms[a.userChatId]?.chatList?.[
          chatRoms[a.userChatId]?.chatList.length - 1
        ];
      const lastChatB =
        chatRoms[b.userChatId]?.chatList?.[
          chatRoms[b.userChatId]?.chatList.length - 1
        ];

      const timeA = lastChatA?.time ?? 0;
      const timeB = lastChatB?.time ?? 0;

      return timeB - timeA;
    });

    setChatUsersList(filteredUserList);
  }, [chatRoms, user?.uid, userChats, users]);

  useEffect(() => {
    if (!user?.uid) return;

    const un = onSnapshot(
      collection(db, "usersChats", user.uid, "chatRomIds"),
      (snapshot) => {
        const chatIds = [];
        snapshot.forEach((doc) => {
          chatIds.push(doc.data().chatRomId);
        });
        setIds(chatIds);
      }
    );
    return () => un();
  }, [user?.uid]);

  return (
    <div className="relative  overflow-auto h-[calc(100%-136px)]">
      {chatUsersList.map(({ user, userChatId }, index) => (
        <ChatListItem key={index} user={user} userChatId={userChatId} />
      ))}
    </div>
  );
};

export default ChatList;
