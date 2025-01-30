import { PromiseWithKnownReason } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {
  MaybeDrafted,
  PatchCollection,
} from "@reduxjs/toolkit/dist/query/core/buildThunks";
import { QueryFulfilledRejectionReason } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { NotesStateType, UpdateNoteType } from "notetypes";

export const updateDraftNote = (
  draft: MaybeDrafted<NotesStateType>,
  id: number,
  patch: Partial<UpdateNoteType>
) => {
  draft.notes = draft.notes.map((note) => {
    if (note.id === id) {
      return { ...note, ...patch };
    }
    return note;
  });
  if (draft.notesById[id]) {
    draft.notesById[id] = { ...draft.notesById[id], ...patch };
  }
};

export const updatePinNote = (
  draft: MaybeDrafted<NotesStateType>,
  id: number
) => {
  draft.notes = draft.notes.map((note) => {
    if (note.id === id) {
      return { ...note, pinned: !note.pinned, archived: false, trashed: false };
    }
    return note;
  });
  if (draft.notesById[id]) {
    draft.notesById[id] = {
      ...draft.notesById[id],
      pinned: !draft.notesById[id].pinned,
      archived: false,
      trashed: false,
    };
  }
};

export const updateArchiveNote = (
  draft: MaybeDrafted<NotesStateType>,
  id: number
) => {
  draft.notes = draft.notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        archived: !note.archived,
        pinned: false,
        trashed: false,
      };
    }
    return note;
  });
  if (draft.notesById[id]) {
    draft.notesById[id] = {
      ...draft.notesById[id],
      archived: !draft.notesById[id].archived,
      pinned: false,
      trashed: false,
    };
  }
};

export const updateTrashNote = (
  draft: MaybeDrafted<NotesStateType>,
  id: number
) => {
  draft.notes = draft.notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        trashed: !note.trashed,
        pinned: false,
        archived: false,
      };
    }
    return note;
  });
  if (draft.notesById[id]) {
    draft.notesById[id] = {
      ...draft.notesById[id],
      trashed: !draft.notesById[id].trashed,
      pinned: false,
      archived: false,
    };
  }
};

export const updateColorNote = (
  draft: MaybeDrafted<NotesStateType>,
  id: number,
  color: string
) => {
  draft.notes = draft.notes.map((note) => {
    if (note.id === id) {
      return { ...note, color };
    }
    return note;
  });

  if (draft.notesById[id]) {
    draft.notesById[id] = {
      ...draft.notesById[id],
      color,
    };
  }
};

export const optimisticNoteUpdateHelper = async (
  queryFulfilled: PromiseWithKnownReason<
    {
      data: UpdateNoteType;
      meta: FetchBaseQueryMeta | undefined;
    },
    QueryFulfilledRejectionReason<
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >
    >
  >,
  patchResult: PatchCollection
) => {
  try {
    await queryFulfilled;
  } catch {
    patchResult.undo();
  }
};
