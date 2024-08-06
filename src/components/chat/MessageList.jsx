import { useEffect, useMemo } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const MessageList = ({ scrollRef }) => {
  const [parent] = useAutoAnimate();
  const { chatRoms, currentChatId } = useSelector((state) => state.chat);
  const { scrolling } = useSelector((state) => state.chat);

  const chatList = useMemo(() => {
    return chatRoms[currentChatId]?.chatList;
  }, [chatRoms, currentChatId]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [scrollRef, scrolling, chatList]);

  return (
    <div
      ref={parent}
      className="bg-gray-200 px-4 h-[calc(100%-144px)] max-sm:h-[calc(100%-114px)] overflow-auto"
    >
      {currentChatId &&
        chatList.map((message, index, arr) => (
          <Message
            key={message.time}
            arr={arr}
            index={index}
            message={message}
          />
        ))}
      <span ref={scrollRef}></span>
    </div>
  );
};

export default MessageList;
