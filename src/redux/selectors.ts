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
  (state: RootState) => state.notes.pinnedIds,
  (state: RootState) => state.notes.notesById,
  (pinnedIds, notesById) => selectNotesByIds(pinnedIds, notesById)
);

export const selectArchivedNotes = createSelector(
  (state: RootState) => state.notes.archiveIds,
  (state: RootState) => state.notes.notesById,
  (archiveIds, notesById) => selectNotesByIds(archiveIds, notesById)
);

export const selectOthersNotes = createSelector(
  (state: RootState) => state.notes.othersIds,
  (state: RootState) => state.notes.notesById,
  (othersIds, notesById) => selectNotesByIds(othersIds, notesById)
);

export const selectTrashedNotes = createSelector(
  (state: RootState) => state.notes.trashIds,
  (state: RootState) => state.notes.notesById,
  (trashIds, notesById) => selectNotesByIds(trashIds, notesById)
);

export const selectReminderNotes = createSelector(
  (state: RootState) => state.notes.hasReminderIds,
  (state: RootState) => state.notes.notesById,
  (hasReminderIds, notesById) =>
    selectNotesByIdsCategorized(hasReminderIds, notesById)
);

export const selectLabelledNotes = createSelector(
  (state: RootState) => state.notes.hasLabelIds,
  (state: RootState) => state.notes.notesById,
  (hasLabelIds, notesById) =>
    selectNotesByIdsCategorized(hasLabelIds, notesById)
);

export const selectNotesByLabelId = createSelector(
  (state: RootState) => state.notes.currentLabelIds,
  (state: RootState) => state.notes.notesById,
  (currentLabelIds, notesById) =>
    selectNotesByIdsCategorized(currentLabelIds, notesById)
);

export const selectNotes = createSelector(
  (state: RootState) => state.notes.allIds,
  (state: RootState) => state.notes.notesById,
  (allIds, notesById) => selectNotesByIds(allIds, notesById)
);
