import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./auth/authMiddleware";
import authReducer from "./auth/authSlice";
import menuReducer from "./global/globalSlice";
import labelReducer from "./labels/labelSlice";
import colorReducer from "./notes/color/colorSlice";
import noteReducer from "./notes/noteSlice";
import reminderNoteReducer from "./reminder/reminderSlice";

const store = configureStore({
  reducer: {
    noteColor: colorReducer,
    notes: noteReducer,
    allReminderNotes: reminderNoteReducer,
    allLabels: labelReducer,
    menus: menuReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
