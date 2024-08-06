import { auth } from "../../Firebase/config";
import { nanoid } from "@reduxjs/toolkit";
import {
  createChatRomIdToUserChats,
  createChatRom,
  getUserChatRoms,
} from "../../Firebase/actions";
import { findCommonChatId } from "../../utils";
import {
  setCurrentChatIdToRedux,
  setCurrentChatUserToRedux,
} from "../../redux/chat/utils";
import { useState } from "react";

const SearchUserItem = ({ user, setSearch }) => {
  const [loading, setLoading] = useState(false);

  const handleChatCreation = async (currentUser, targetUser, setSearch) => {
    try {
      setLoading(true);

      const currentChatIds = await getUserChatRoms(currentUser.uid);
      const targetChatIds = await getUserChatRoms(targetUser.uid);

      const existsChatId = findCommonChatId(currentChatIds, targetChatIds);

      if (!existsChatId) {
        const chatRomId = nanoid();

        await createChatRom(chatRomId, targetUser.uid, currentUser.uid);
        await createChatRomIdToUserChats(currentUser.uid, chatRomId);
        await createChatRomIdToUserChats(targetUser.uid, chatRomId);

        setCurrentChatUserToRedux(targetUser);
        setCurrentChatIdToRedux(chatRomId);
      } else {
        setCurrentChatUserToRedux(targetUser);
        setCurrentChatIdToRedux(existsChatId);
      }
    } catch (error) {
      console.error("Error during chat creation:", error);
    } finally {
      setLoading(false);
      setSearch("");
    }
  };

  const handleUserSelection = () => {
    const currentUser = auth.currentUser;
    handleChatCreation(currentUser, user, setSearch);
  };

  return (
    <div
      className={`flex p-2 items-center gap-2 text-white hover:bg-black/40 ${
        loading ? "opacity-50" : "hover:cursor-pointer transition"
      } `}
      onClick={handleUserSelection}
    >
      <img
        className="w-12 h-12 rounded-full object-cover object-center"
        src={user?.photoURL}
        alt=""
      />
      <div>
        <span className="font-bold text-lg ">{user?.displayName}</span>
      </div>
    </div>
  );
};

export default SearchUserItem;
