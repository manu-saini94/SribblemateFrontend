import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { labelsApi } from "api/labelsApi";
import { notesApi } from "api/notesApi";
import authReducer from "./auth/authSlice";
import menuReducer from "./global/globalSlice";
import labelReducer from "./labels/labelSlice";
import noteReducer from "./notes/noteSlice";
import userReducer from "./users/usersSlice";

const store = configureStore({
  reducer: {
    allNotes: noteReducer,
    allLabels: labelReducer,
    menus: menuReducer,
    users: userReducer,
    auth: authReducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [labelsApi.reducerPath]: labelsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(notesApi.middleware)
      .concat(labelsApi.middleware),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authMiddleware),
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export default store;
