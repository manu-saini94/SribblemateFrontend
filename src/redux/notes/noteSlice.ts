import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NoteStoreInitialStateType } from "storetypes";
import { getAllNotesByUser } from "../../api/services";

const initialState: NoteStoreInitialStateType = {
  loading: false,
  notes: [],
  error: "",
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () => {
  return getAllNotesByUser().then((response) => response.data.object);
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
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
      state.error = action.error.message || "Failed to fetch notes";
    });
  },
});

export default noteSlice.reducer;
