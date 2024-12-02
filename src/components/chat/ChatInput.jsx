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
    <div className="bg-slate-50 h-16 px-3  flex items-center justify-center ">
      <form className="flex-1 h-full relative" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type something"
          className="w-full h-full outline-none bg-slate-50"
        />
        {imgFile && (
          <FaFileImage
            className="absolute -top-4 right-4 text-slate-400"
            size={28}
          />
        )}
        {isPending && (
          <AiOutlineLoading className="absolute text-gray-800 right-2 top-5 animate-spin h-6 w-6" />
        )}
      </form>

      <div className="flex items-center space-x-4">
        <label htmlFor="file" className="cursor-pointer">
          <LuImagePlus className="h-6 w-6 hover:text-slate-600" />
        </label>
        <input
          type="file"
          className="hidden"
          id="file"
          accept=".png,.jpg,.jpeg"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <IoIosAttach className="h-6 w-6 cursor-pointer hover:text-slate-600" />
        <Button onClick={handleSubmit} className="bg-sky-400" text="Send" />
      </div>
    </div>
  );
};

export default ChatInput;
