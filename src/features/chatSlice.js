import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: { messages: [], groupChats: [] },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setGroupChats: (state, action) => {
      state.groupChats = action.payload;
    },
  },
});

export const { setMessages, setGroupChats } = chatSlice.actions;
export default chatSlice.reducer;
