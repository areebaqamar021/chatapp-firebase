// /redux/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    activeRoom: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setActiveRoom: (state, action) => {
      state.activeRoom = action.payload;
    },
  },
});

export const { setMessages, setActiveRoom } = chatSlice.actions;
export default chatSlice.reducer;
