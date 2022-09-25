import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login function will dispatch the payload
    login: (state, action) => {
      state.user = action.payload;
    },
    //Login function will update the user state
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Function to select the user
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
