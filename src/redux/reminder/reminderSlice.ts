import { createSlice } from "@reduxjs/toolkit";
import { ReminderNoteStoreInitialStateType } from "notetypes";
import { fetchReminderNotes } from "../asyncThunks";

const initialState: ReminderNoteStoreInitialStateType = {
  loading: false,
  reminderNotes: [],
  error: "",
};

const reminderSlice = createSlice({
  name: "reminderNotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReminderNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReminderNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.reminderNotes = action.payload;
      state.error = "";
    });
    builder.addCase(fetchReminderNotes.rejected, (state, action) => {
      state.loading = false;
      state.reminderNotes = [];
      state.error = action.error.message || "Failed to fetch notes";
    });
  },
});

export default reminderSlice.reducer;
