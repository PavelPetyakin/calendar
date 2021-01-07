import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer } from "../reducer/reducer";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

// store.subscribe(() => console.log(store.getState()));
