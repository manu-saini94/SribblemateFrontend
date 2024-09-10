import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import labelReducer from "./labels/labelSlice";
import colorReducer from "./notes/color/colorSlice";
import noteReducer from "./notes/noteSlice";
import reminderNoteReducer from "./reminder/reminderSlice";
// const store = createStore(rootReducer, applyMiddleware(thunk));

const store = configureStore({
  reducer: {
    noteColor: colorReducer,
    notes: noteReducer,
    allReminderNotes: reminderNoteReducer,
    allLabels: labelReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
