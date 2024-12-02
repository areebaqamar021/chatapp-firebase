import { store } from "../store";
import {
  resetChat,
  setChatIds,
  setCurrentChatId,
  setCurrentChatUser,
} from "./chatSlice";

export const setIds = (data) => {
  store.dispatch(setChatIds(data));
};

export const setCurrentChatIdToRedux = (data) => {
  store.dispatch(setCurrentChatId(data));
};

export const setCurrentChatUserToRedux = (data) => {
  store.dispatch(setCurrentChatUser(data));
};

export const resetChatOnRedux = () => {
  store.dispatch(resetChat());
};
