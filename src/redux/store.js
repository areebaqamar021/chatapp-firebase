import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import usersSlice from "./users/usersSlice";
import chatSlice from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    chat: chatSlice,
  },
});
