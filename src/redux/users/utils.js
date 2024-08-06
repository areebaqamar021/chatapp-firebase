import { store } from "../store";
import { resetUsers, setUsers } from "./usersSlice";

export const setUsersToRedux = (usersData) => {
  store.dispatch(setUsers(usersData));
};

export const resetUserOnRedux = () => {
  store.dispatch(resetUsers());
};
