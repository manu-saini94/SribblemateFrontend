import {
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
    return true; // Return true immediately if any non-array field has changed
  }

  // Check array fields by length
  if (
    newNoteValues.images.length !== initialUpdateNoteValue.images.length ||
    newNoteValues.labelSet.length !== initialUpdateNoteValue.labelSet.length ||
    newNoteValues.collaboratorList.length !==
      initialUpdateNoteValue.collaboratorList.length
  ) {
    return true; // Return true if lengths are different, indicating a change
  }

  return false; // Return false if no changes are detected
};
