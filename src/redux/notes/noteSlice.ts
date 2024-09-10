import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteStoreInitialStateType, UpdateNoteType } from "notetypes";
import { initialNoteValue } from "utility/reduxutils/noteUtils";
import {
  createNote,
  fetchAllLabelNotes,
  fetchNotes,
  fetchNotesByLabel,
} from "../asyncThunks";

const initialLoadingNoteStates = {
  loading: false,
  createdNoteLoading: false,
  allLabelNotesLoading: false,
  notesByLabelIdLoading: false,
};

const initialDataStates = {
  createdNoteObject: initialNoteValue,
  pinnedAndOthersNotes: [],
  allLabelNotes: [],
  notesByLabelId: {},
  currentLabelNotes: [],
};

const initialErrorStates = {
  error: "",
  createdNoteError: "",
  allLabelNotesError: "",
  notesByLabelIdError: "",
};

const initialState: NoteStoreInitialStateType = {
  labelId: 0,
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
    extractFromNotesByLabelId(state, action: PayloadAction<number>) {
      state.labelId = action.payload;
      if (state.notesByLabelId[state.labelId]) {
        state.currentLabelNotes = state.notesByLabelId[state.labelId] || [];
      }
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
      })
      .addCase(fetchNotesByLabel.pending, (state) => {
        state.notesByLabelIdLoading = true;
      })
      .addCase(fetchNotesByLabel.fulfilled, (state, action) => {
        state.notesByLabelIdLoading = false;
        state.notesByLabelId[state.labelId] = action.payload;
        state.notesByLabelIdError = "";
      })
      .addCase(fetchNotesByLabel.rejected, (state, action) => {
        state.notesByLabelIdLoading = false;
        state.notesByLabelIdError =
          action.error.message ?? "Failed to fetch notes with labels";
      });
  },
});

export const { insertNewNote, updateNote, extractFromNotesByLabelId } =
  noteSlice.actions;
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
