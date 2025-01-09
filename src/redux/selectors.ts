import { UpdateNoteType } from "notetypes";
import { createSelector } from "reselect";
import { RootState } from "./store";

const selectNotesByIds = (
  ids: number[],
  notesById: { [id: number]: UpdateNoteType }
) =>
  ids
    .map((id) => notesById[id])
    .filter((note) => note !== undefined && note !== null);

const selectNotesByIdsPinned = (
  ids: number[],
  notesById: { [id: number]: UpdateNoteType }
) =>
  ids
    .map((id) => notesById[id])
    .filter((note) => note && note.pinned) as UpdateNoteType[];

const selectNotesByIdsArchived = (
  ids: number[],
  notesById: { [id: number]: UpdateNoteType }
) =>
  ids
    .map((id) => notesById[id])
    .filter((note) => note && note.archived) as UpdateNoteType[];

const selectNotesByIdsOthers = (
  ids: number[],
  notesById: { [id: number]: UpdateNoteType }
) =>
  ids
    .map((id) => notesById[id])
    .filter(
      (note) => note && !note.archived && !note.pinned && !note.trashed
    ) as UpdateNoteType[];

const selectNotesByIdsCategorized = (
  ids: number[],
  notesById: { [id: number]: UpdateNoteType }
) => {
  return {
    pinnedNotes: selectNotesByIdsPinned(ids, notesById),
    archivedNotes: selectNotesByIdsArchived(ids, notesById),
    othersNotes: selectNotesByIdsOthers(ids, notesById),
  };
};

export const selectPinnedNotes = createSelector(
  (state: RootState) => state.allNotes.pinnedIds,
  (state: RootState) => state.allNotes.notesById,
  (pinnedIds, notesById) => selectNotesByIds(pinnedIds, notesById)
);

export const selectArchivedNotes = createSelector(
  (state: RootState) => state.allNotes.archiveIds,
  (state: RootState) => state.allNotes.notesById,
  (archiveIds, notesById) => selectNotesByIds(archiveIds, notesById)
);

export const selectOthersNotes = createSelector(
  (state: RootState) => state.allNotes.othersIds,
  (state: RootState) => state.allNotes.notesById,
  (othersIds, notesById) => selectNotesByIds(othersIds, notesById)
);

export const selectTrashedNotes = createSelector(
  (state: RootState) => state.allNotes.trashIds,
  (state: RootState) => state.allNotes.notesById,
  (trashIds, notesById) => selectNotesByIds(trashIds, notesById)
);

export const selectReminderNotes = createSelector(
  (state: RootState) => state.allNotes.hasReminderIds,
  (state: RootState) => state.allNotes.notesById,
  (hasReminderIds, notesById) =>
    selectNotesByIdsCategorized(hasReminderIds, notesById)
);

export const selectLabelledNotes = createSelector(
  (state: RootState) => state.allNotes.hasLabelIds,
  (state: RootState) => state.allNotes.notesById,
  (hasLabelIds, notesById) =>
    selectNotesByIdsCategorized(hasLabelIds, notesById)
);

export const selectNotes = createSelector(
  (state: RootState) => state.allNotes.allIds,
  (state: RootState) => state.allNotes.notesById,
  (allIds, notesById) => selectNotesByIds(allIds, notesById)
);
