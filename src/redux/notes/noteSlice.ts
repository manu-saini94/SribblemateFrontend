import { createSlice } from "@reduxjs/toolkit";
import { NoteStoreInitialStateType, UpdateNoteType } from "notetypes";
import { initialNoteValue } from "utility/reduxutils/noteUtils";
import { createNote, fetchAllLabelNotes, fetchNotes } from "../asyncThunks";

const initialLoadingNoteStates = {
  loading: false,
  createdNoteLoading: false,
  allLabelNotesLoading: false,
};

const initialDataStates = {
  createdNoteObject: initialNoteValue,
  pinnedAndOthersNotes: [],
  allLabelNotes: [],
  allNotesByLabelId: {},
};

const initialErrorStates = {
  error: "",
  createdNoteError: "",
  allLabelNotesError: "",
};

const initialState: NoteStoreInitialStateType = {
  ...initialLoadingNoteStates,
  ...initialDataStates,
  ...initialErrorStates,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    insertNewNote(state) {
      state.pinnedAndOthersNotes.unshift(state.createdNoteObject);
    },

    updateNote(state, action) {},
  },
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
      })
      .addCase(fetchAllLabelNotes.pending, (state) => {
        state.allLabelNotesLoading = true;
      })
      .addCase(fetchAllLabelNotes.fulfilled, (state, action) => {
        state.allLabelNotesLoading = false;
        state.allLabelNotes = action.payload;
        state.allLabelNotesError = "";
      })
      .addCase(fetchAllLabelNotes.rejected, (state, action) => {
        state.allLabelNotesLoading = false;
        state.allLabelNotes = [] as UpdateNoteType[];
        state.allLabelNotesError =
          action.error.message ?? "Failed to fetch notes with labels";
      });
  },
});

export const { insertNewNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;

// transformById(state) {
//   state.byIdTransformObject = state.pinnedAndOthersNotes.reduce(
//     (acc, note) => {
//       acc[note.id] = note;
//       return acc;
//     },
//     {} as ByIdTransformObjectType
//   );
// },
