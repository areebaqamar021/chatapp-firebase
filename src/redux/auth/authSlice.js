import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: undefined,
  isLoading: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setIsLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
    resetAuth: () => {
      return initialState;
    },
  },
});

export const { setUser, setIsLoading, resetAuth } = authSlice.actions;
export default authSlice.reducer;
