import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizedNotes,
  NoteStoreInitialStateType,
  UpdateNoteType,
} from "notetypes";
import { initialNoteValue } from "utility/reduxutils/noteUtils";
import {
  addCollaborator,
  addLabelToNote,
  createNote,
  deleteCollaborator,
  deleteLabelFromNote,
  fetchNotes,
  fetchNotesByLabels,
  updateArchiveForNote,
  updateColorForNote,
  updateNote,
  updatePinForNote,
  updateTrashForNote,
} from "../asyncThunks";

const initialLoadingStates = {
  loading: false,
  createdNoteLoading: false,
  notesByLabelIdLoading: false,
  noteUpdateLoading: false,
};

const initialDataStates = {
  createdNoteObject: initialNoteValue,
  notesById: {},
  allIds: [],
  pinnedIds: [],
  archiveIds: [],
  othersIds: [],
  trashIds: [],
  hasLabelIds: [],
  hasReminderIds: [],
  notesByLabelId: {},
  currentLabelIds: [],
  updatedNote: initialNoteValue,
};

const initialErrorStates = {
  error: "",
  createdNoteError: "",
  notesByLabelIdError: "",
  noteUpdateError: "",
};

const initialState: NoteStoreInitialStateType = {
  labelId: 0,
  ...initialLoadingStates,
  ...initialDataStates,
  ...initialErrorStates,
};

const normalizeNotes = (notes: UpdateNoteType[]): NormalizedNotes => {
  const notesById: { [id: number]: UpdateNoteType } = {};
  const allIds: number[] = [];
  const pinnedIds: number[] = [];
  const archiveIds: number[] = [];
  const othersIds: number[] = [];
  const trashIds: number[] = [];
  const hasLabelIds: number[] = [];
  const hasReminderIds: number[] = [];

  notes.forEach((note) => {
    notesById[note.id] = note;
    allIds.push(note.id);
    if (note.pinned) pinnedIds.push(note.id);
    if (note.archived) archiveIds.push(note.id);
    if (note.trashed) trashIds.push(note.id);
    if (!note.pinned && !note.archived && !note.trashed)
      othersIds.push(note.id);
    if (note.labelSet.length > 0) hasLabelIds.push(note.id);
    if (note.reminder !== null && note.reminder !== undefined)
      hasReminderIds.push(note.id);
  });

  return {
    notesById,
    allIds,
    pinnedIds,
    archiveIds,
    othersIds,
    trashIds,
    hasLabelIds,
    hasReminderIds,
  };
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    insertNewNote(state) {
      const note = state.createdNoteObject;
      state.notesById[note.id] = note;
      state.allIds.unshift(note.id);
      if (note.pinned) state.pinnedIds.unshift(note.id);
      if (note.archived) state.archiveIds.unshift(note.id);
      if (note.trashed) state.trashIds.unshift(note.id);
      if (!note.pinned && !note.archived && !note.trashed)
        state.othersIds.unshift(note.id);
      if (note?.labelSet?.length > 0) state.hasLabelIds.unshift(note.id);
      if (note.reminder !== null && note.reminder !== undefined)
        state.hasReminderIds.unshift(note.id);
    },
    extractFromNotesByLabelId(state, action: PayloadAction<number>) {
      state.labelId = action.payload;
      if (state.notesByLabelId[state.labelId]) {
        state.currentLabelIds = state.notesByLabelId[state.labelId] || [];
      }
    },

    updateUserNote(state) {
      const note = state.updatedNote;
      state.notesById[note.id] = {
        ...state.notesById[note.id],
        ...note,
      };
      state.updatedNote = initialNoteValue;
    },
    setCollaboratorUpdateError(state, action: PayloadAction<string>) {
      state.noteUpdateError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        const {
          notesById,
          allIds,
          pinnedIds,
          archiveIds,
          othersIds,
          trashIds,
          hasLabelIds,
          hasReminderIds,
        } = normalizeNotes(action.payload);
        state.notesById = notesById;
        state.allIds = allIds;
        state.pinnedIds = pinnedIds;
        state.archiveIds = archiveIds;
        state.othersIds = othersIds;
        state.trashIds = trashIds;
        state.hasLabelIds = hasLabelIds;
        state.hasReminderIds = hasReminderIds;
        state.error = "";
        console.log("Sol note");
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.notesById = {};
        state.error = action.error.message ?? "Failed to fetch notes";
        console.log("Rejected note");
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

      .addCase(fetchNotesByLabels.pending, (state) => {
        state.notesByLabelIdLoading = true;
      })
      .addCase(fetchNotesByLabels.fulfilled, (state, action) => {
        state.notesByLabelIdLoading = false;
        state.notesByLabelId = action.payload;
        state.notesByLabelIdError = "";
      })
      .addCase(fetchNotesByLabels.rejected, (state, action) => {
        state.notesByLabelIdLoading = false;
        state.notesByLabelIdError =
          action.error.message ?? "Failed to fetch notes with labelIds";
      })

      // .addCase(fetchNotesByLabel.pending, (state) => {
      //   state.notesByLabelIdLoading = true;
      // })
      // .addCase(fetchNotesByLabel.fulfilled, (state, action) => {
      //   state.notesByLabelIdLoading = false;
      //   state.notesByLabelId[state.labelId] = action.payload;
      //   state.notesByLabelIdError = "";
      // })
      // .addCase(fetchNotesByLabel.rejected, (state, action) => {
      //   state.notesByLabelIdLoading = false;
      //   state.notesByLabelIdError =
      //     action.error.message ?? "Failed to fetch notes with labels";
      // })

      .addCase(updateNote.pending, (state) => {
        state.noteUpdateLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        state.noteUpdateError = "";
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Failed to update Note";
        state.updatedNote = {} as UpdateNoteType;
      })

      .addCase(updatePinForNote.pending, (state) => {
        state.noteUpdateLoading = true;
      })
      .addCase(updatePinForNote.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        if (action.payload.pinned) {
          state.pinnedIds.unshift(action.payload.id);
          state.archiveIds = state.archiveIds.filter(
            (id) => id !== action.payload.id
          );
          state.othersIds = state.othersIds.filter(
            (id) => id !== action.payload.id
          );
          state.trashIds = state.trashIds.filter(
            (id) => id !== action.payload.id
          );
        } else {
          state.othersIds.unshift(action.payload.id);
          state.pinnedIds = state.pinnedIds.filter(
            (id) => id !== action.payload.id
          );
          state.trashIds = state.trashIds.filter(
            (id) => id !== action.payload.id
          );
        }
        state.noteUpdateError = "";
      })
      .addCase(updatePinForNote.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Failed to update Note";
        state.updatedNote = {} as UpdateNoteType;
      })
      .addCase(updateArchiveForNote.pending, (state) => {
        state.noteUpdateLoading = true;
      })
      .addCase(updateArchiveForNote.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        if (action.payload.archived) {
          state.archiveIds.unshift(action.payload.id);
          state.pinnedIds = state.pinnedIds.filter(
            (id) => id !== action.payload.id
          );
          state.othersIds = state.othersIds.filter(
            (id) => id !== action.payload.id
          );
          state.trashIds = state.trashIds.filter(
            (id) => id !== action.payload.id
          );
        } else {
          state.othersIds.unshift(action.payload.id);
          state.pinnedIds = state.pinnedIds.filter(
            (id) => id !== action.payload.id
          );
          state.trashIds = state.trashIds.filter(
            (id) => id !== action.payload.id
          );
          state.archiveIds = state.archiveIds.filter(
            (id) => id !== action.payload.id
          );
        }
        state.noteUpdateError = "";
      })
      .addCase(updateArchiveForNote.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Failed to update Note";
        state.updatedNote = {} as UpdateNoteType;
      })

      .addCase(updateTrashForNote.pending, (state) => {
        state.noteUpdateLoading = true;
      })
      .addCase(updateTrashForNote.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        state.trashIds.unshift(action.payload.id);
        state.pinnedIds = state.pinnedIds.filter(
          (id) => id !== action.payload.id
        );
        state.othersIds = state.othersIds.filter(
          (id) => id !== action.payload.id
        );
        state.archiveIds = state.trashIds.filter(
          (id) => id !== action.payload.id
        );

        state.noteUpdateError = "";
      })
      .addCase(updateTrashForNote.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Failed to update Note";
        state.updatedNote = {} as UpdateNoteType;
      })

      .addCase(updateColorForNote.pending, (state) => {
        state.noteUpdateLoading = true;
      })
      .addCase(updateColorForNote.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        state.noteUpdateError = "";
      })
      .addCase(updateColorForNote.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Failed to update Note";
        state.updatedNote = {} as UpdateNoteType;
      })

      .addCase(addCollaborator.pending, (state) => {
        state.noteUpdateLoading = true;
        state.noteUpdateError = "";
        state.updatedNote = {} as UpdateNoteType;
      })
      .addCase(addCollaborator.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        state.noteUpdateError = "";
      })
      .addCase(addCollaborator.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Some problem occured";
        state.updatedNote = {} as UpdateNoteType;
      })

      .addCase(deleteCollaborator.pending, (state) => {
        state.noteUpdateLoading = true;
        state.noteUpdateError = "";
        state.updatedNote = {} as UpdateNoteType;
      })
      .addCase(deleteCollaborator.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        state.noteUpdateError = "";
      })
      .addCase(deleteCollaborator.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Some problem occured";
        state.updatedNote = {} as UpdateNoteType;
      })

      .addCase(deleteLabelFromNote.pending, (state, action) => {
        state.noteUpdateLoading = true;
        state.noteUpdateError = "";
        state.updatedNote = {} as UpdateNoteType;
      })
      .addCase(deleteLabelFromNote.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        state.noteUpdateError = "";
      })
      .addCase(deleteLabelFromNote.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Some problem occured";
        state.updatedNote = {} as UpdateNoteType;
      })

      .addCase(addLabelToNote.pending, (state, action) => {
        state.noteUpdateLoading = true;
        state.noteUpdateError = "";
        state.updatedNote = {} as UpdateNoteType;
      })
      .addCase(addLabelToNote.fulfilled, (state, action) => {
        state.noteUpdateLoading = false;
        state.updatedNote = action.payload;
        state.noteUpdateError = "";
      })
      .addCase(addLabelToNote.rejected, (state, action) => {
        state.noteUpdateLoading = false;
        state.noteUpdateError = action.error.message ?? "Some problem occured";
        state.updatedNote = {} as UpdateNoteType;
      });
  },
});

export const {
  insertNewNote,
  updateUserNote,
  extractFromNotesByLabelId,
  setCollaboratorUpdateError,
} = noteSlice.actions;
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
