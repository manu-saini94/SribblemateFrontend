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
import { UpdateNoteType } from "notetypes";

export const updateDraftNote = (
  draft: MaybeDrafted<UpdateNoteType[]>,
  id: number,
  patch: Partial<UpdateNoteType>
) =>
  draft.map((note) => {
    if (note.id === id) {
      return { ...note, ...patch };
    }
    return note;
  });

export const updatePinNote = (
  draft: MaybeDrafted<UpdateNoteType[]>,
  id: number
) =>
  draft.map((note) => {
    if (note.id === id) {
      return { ...note, pinned: !note.pinned, archived: false, trashed: false };
    }
    return note;
  });

export const updateArchiveNote = (
  draft: MaybeDrafted<UpdateNoteType[]>,
  id: number
) =>
  draft.map((note) => {
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

export const updateTrashNote = (
  draft: MaybeDrafted<UpdateNoteType[]>,
  id: number
) =>
  draft.map((note) => {
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

export const updateColorNote = (
  draft: MaybeDrafted<UpdateNoteType[]>,
  id: number,
  color: string
) =>
  draft.map((note) => {
    if (note.id === id) {
      return { ...note, color };
    }
    return note;
  });

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
