import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChatId: undefined,
  currentChatUser: undefined,
  chatRoms: undefined,
  userChats: undefined,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatRoms: (state, action) => {
      state.chatRoms = action.payload;
    },
    setChatIds: (state, action) => {
      state.userChats = action.payload;
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    setCurrentChatUser: (state, action) => {
      state.currentChatUser = action.payload;
    },
    resetChat: (state) => {
      state.currentChatId = undefined;
      state.currentChatUser = undefined;
    },
  },
});

export const selectChatByChatId = (state, id) => {
  return state.chat.chatRoms[id] || undefined;
};

export const {
  setChatRoms,
  setChatIds,
  setCurrentChatId,
  setCurrentChatUser,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;
