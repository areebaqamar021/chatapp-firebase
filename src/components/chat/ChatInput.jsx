import { useState } from "react";
import Button from "../shared/Button";
import { IoIosAttach } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { updateProfileImageToFirebase } from "../../Firebase/actions";
import { FaFileImage } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

const ChatInput = ({ scrollRef }) => {
  const [isPending, setIsPending] = useState(false);
  const [input, setInput] = useState("");
  const [imgFile, setImageFile] = useState(null);
  const { currentChatId } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    setIsPending(true);
    event.preventDefault();
    if (!input && !imgFile) return;
    setInput("");

    try {
      let photoURL = imgFile
        ? await updateProfileImageToFirebase(imgFile, user.uid)
        : undefined;

      await updateDoc(doc(db, "chatsRoms", currentChatId), {
        chatList: arrayUnion({
          message: input,
          ownerId: user.uid,
          time: Date.now(),
          photoURL: photoURL || "",
        }),
      });

      setImageFile(null);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      setIsPending(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white h-16 px-3 flex items-center justify-center rounded-b-lg shadow-md">
      <form className="flex-1 h-full relative" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type something"
          className="w-full h-full outline-none bg-white text-gray-700 placeholder-gray-400 rounded-md px-3 focus:ring-2 focus:ring-sky-400 focus:outline-none"
        />
        {imgFile && (
          <FaFileImage
            className="absolute -top-4 right-4 text-gray-500"
            size={28}
          />
        )}
        {isPending && (
          <AiOutlineLoading className="absolute text-gray-800 right-2 top-5 animate-spin h-6 w-6" />
        )}
      </form>

      <div className="flex items-center space-x-4">
        <label htmlFor="file" className="cursor-pointer">
          <LuImagePlus className="h-6 w-6 text-gray-500 hover:text-gray-600" />
        </label>
        <input
          type="file"
          className="hidden"
          id="file"
          accept=".png,.jpg,.jpeg"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <IoIosAttach className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-600" />
        <Button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
          text="Send"
        />
      </div>
    </div>
  );
};

export default ChatInput;
