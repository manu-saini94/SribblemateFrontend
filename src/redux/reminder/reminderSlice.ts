import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReminderNoteStoreInitialStateType } from "storetypes";
import { getAllReminderNotesByUser } from "../../api/services";

const initialState: ReminderNoteStoreInitialStateType = {
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
