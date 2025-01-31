import {
  AllCategoriesNotesType,
  CreateNoteType,
  UpdateCollaboratorType,
  UpdateNoteType,
} from "notetypes";

export const initialCreateNoteValue: CreateNoteType = {
  title: "",
  content: "",
  images: [],
  trashed: false,
  archived: false,
  pinned: false,
  color: "#fff",
  reminder: "",
  createdAt: "",
  updatedAt: "",
  labelSet: [],
  listItems: [],
  collaboratorList: [],
};

export const initialUpdateNoteValue: UpdateNoteType = {
  id: -1,
  title: "",
  content: "",
  images: [],
  trashed: false,
  archived: false,
  pinned: false,
  color: "#fff",
  reminder: "",
  createdAt: "",
  updatedAt: "",
  createdBy: {} as UpdateCollaboratorType,
  updatedBy: {} as UpdateCollaboratorType,
  labelSet: [],
  listItems: [],
  collaboratorList: [],
};

export const initialNoteValue: UpdateNoteType = {
  ...initialUpdateNoteValue,
};

export const hasNoteChanged = (newNoteValues: CreateNoteType): boolean => {
  // Check non-array fields
  if (
    newNoteValues.title !== initialUpdateNoteValue.title ||
    newNoteValues.content !== initialUpdateNoteValue.content
  ) {
    return true;
  }

  if (
    newNoteValues.images.length !== initialUpdateNoteValue.images.length ||
    newNoteValues.labelSet.length !== initialUpdateNoteValue.labelSet.length ||
    newNoteValues.collaboratorList.length !==
      initialUpdateNoteValue.collaboratorList.length
  ) {
    return true;
  }

  return false;
};

export const getPinnedNotes = (
  allNotes: UpdateNoteType[]
): UpdateNoteType[] => {
  return allNotes.filter((note) => note.pinned);
};

export const getArchivedNotes = (
  allNotes: UpdateNoteType[]
): UpdateNoteType[] => {
  return allNotes.filter((note) => note.archived);
};

export const getTrashedNotes = (
  allNotes: UpdateNoteType[]
): UpdateNoteType[] => {
  return allNotes.filter((note) => note.trashed);
};

export const getOthersNotes = (
  allNotes: UpdateNoteType[]
): UpdateNoteType[] => {
  return allNotes.filter(
    (note) => !note.pinned && !note.archived && !note.trashed
  );
};

export const getCategorizedNotes = (
  allNotes: UpdateNoteType[]
): AllCategoriesNotesType => {
  return allNotes.length > 0
    ? {
        pinnedNotes: getPinnedNotes(allNotes),
        othersNotes: getOthersNotes(allNotes),
        archivedNotes: getArchivedNotes(allNotes),
      }
    : { pinnedNotes: [], othersNotes: [], archivedNotes: [] };
};

export const getPinnedAndOthersCategorizedNotes = (
  allNotes: UpdateNoteType[]
): AllCategoriesNotesType => {
  return allNotes.length > 0
    ? {
        pinnedNotes: getPinnedNotes(allNotes),
        othersNotes: getOthersNotes(allNotes),
      }
    : { pinnedNotes: [], othersNotes: [] };
};
