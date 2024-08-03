import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllReminderNotesByUser } from "../../api/services";

const initialState = {
  loading: false,
  reminderNotes: [],
  error: "",
};

export const fetchReminderNotes = createAsyncThunk(
  "reminderNotes/fetchNotes",
  () => {
    return getAllReminderNotesByUser().then((response) => response.data.object);
  }
);

const reminderSlice = createSlice({
  name: "reminderNotes",
  initialState,
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
      state.error = action.error.message;
    });
  },
});

export default reminderSlice.reducer;
