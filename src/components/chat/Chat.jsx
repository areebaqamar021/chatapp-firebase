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
    <div className="w-full sm:basis-2/3 bg-white text-gray-700">
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
        <div className="flex flex-col justify-center items-center h-full text-lg sm:text-xl p-8">
          <AiOutlineMessage size={150} className="text-gray-400 mb-3" />
          <p className="text-gray-500 text-center">
            Send messages and photos to your friends.
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
