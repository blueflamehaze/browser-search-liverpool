import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/store/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { starWarsApi } from "../features/services/api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add the generated reducer for the star War API
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

setupListeners(store.dispatch);
