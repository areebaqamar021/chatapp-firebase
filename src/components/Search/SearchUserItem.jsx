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
      className={`flex p-3 items-center gap-4 rounded-lg bg-white/90 shadow-sm hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform duration-300 ${
        loading ? "opacity-50 pointer-events-none" : "cursor-pointer"
      }`}
      onClick={handleUserSelection}
    >
      <img
        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300 shadow-md"
        src={user?.photoURL}
        alt="User profile"
      />
      <div>
        <span className="font-semibold text-gray-800 hover:text-white text-lg">
          {user?.displayName}
        </span>
      </div>
    </div>
  );
};

export default SearchUserItem;
