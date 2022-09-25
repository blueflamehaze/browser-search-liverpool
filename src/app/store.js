import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/store/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
