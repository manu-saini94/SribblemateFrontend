import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./auth/authMiddleware";
import authReducer from "./auth/authSlice";
import menuReducer from "./global/globalSlice";
import labelReducer from "./labels/labelSlice";
import colorReducer from "./notes/color/colorSlice";
import noteReducer from "./notes/noteSlice";
import userReducer from "./users/usersSlice";

const store = configureStore({
  reducer: {
    noteColor: colorReducer,
    allNotes: noteReducer,
    allLabels: labelReducer,
    menus: menuReducer,
    users: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
