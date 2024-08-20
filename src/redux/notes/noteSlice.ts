import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateNoteType,
  NoteStoreInitialStateType,
  UpdateNoteType,
} from "notetypes";
import { initialNoteValue } from "utility/reduxutils/noteUtils";
import { createNoteForUser, getAllNotesByUser } from "../../api/services";

const initialState: NoteStoreInitialStateType = {
  loading: false,
  createdNoteLoading: false,
  createdNoteObject: initialNoteValue,
  createdNoteError: "",
  pinnedAndOthersNotes: [],
  error: "",
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () => {
  return getAllNotesByUser().then((response) => response.data.object);
});

export const createNote = createAsyncThunk(
  "notes/createNote",
  (noteData: CreateNoteType) => {
    return createNoteForUser(noteData).then((response) => response.data.object);
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.pinnedAndOthersNotes = action.payload;
        state.error = "";
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.pinnedAndOthersNotes = [];
        state.error = action.error.message ?? "Failed to fetch notes";
      })
      .addCase(createNote.pending, (state) => {
        state.createdNoteLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.createdNoteLoading = false;
        state.createdNoteObject = action.payload;
        state.createdNoteError = "";
      })
      .addCase(createNote.rejected, (state, action) => {
        state.createdNoteLoading = false;
        state.createdNoteObject = {} as UpdateNoteType;
        state.createdNoteError =
          action.error.message ?? "Failed to create note";
      });
  },
});

export default noteSlice.reducer;
