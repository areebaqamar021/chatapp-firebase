import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    resetUsers: () => {
      return initialState;
    },
  },
});

export const selectUserById = (state, id) => {
  return state.users.users.find((user) => {
    if (user.uid === id) {
      return true;
    }
  });
};

export const { setUsers, resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
