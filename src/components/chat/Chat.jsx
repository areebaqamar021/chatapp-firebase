import { AiOutlineMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useRef } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { ChatHeader } from "./ChatHeader";

const Chat = () => {
  const scrollRef = useRef(null);
  const { currentChatUser, currentChatId } = useSelector((state) => state.chat);

  return (
    <div className="w-full sm:basis-2/3 bg-gray-200">
      {currentChatId ? (
        <>
          <ChatHeader
            photoURL={currentChatUser?.photoURL}
            displayName={currentChatUser?.displayName}
          />
          <MessageList scrollRef={scrollRef} />
          <ChatInput scrollRef={scrollRef} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full text-2xl sm:text-xl p-8">
          <AiOutlineMessage size={220} className="text-gray-500 mb-3" />
          <p className="text-gray-600">
            Send your photos and messages to a friend or group
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
