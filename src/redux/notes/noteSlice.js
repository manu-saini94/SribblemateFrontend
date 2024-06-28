import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllNotesByUserId } from "../../api/services";

const initialState = {
  loading: false,
  notes: [],
  error: "",
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () => {
  return getAllNotesByUserId(1).then((response) => response.data);
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = "";
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
  },
});

export default noteSlice.reducer;
