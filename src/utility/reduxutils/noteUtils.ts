import { CreateNoteType, UpdateNoteType } from "notetypes";

export const initialCreateNoteValue: CreateNoteType = {
  title: "",
  content: "",
  images: [],
  isTrashed: false,
  isArchived: false,
  isPinned: false,
  color: "",
  reminder: "",
  createdAt: "",
  updatedAt: "",
  labelSet: [],
  collaboratorList: [],
};

export const initialNoteValue: UpdateNoteType = {
  id: -1, // Initialize with an empty string or a default value for the ID
  ...initialCreateNoteValue,
};

export const hasNoteChanged = (newNoteValues: CreateNoteType): boolean => {
  // Check non-array fields
  if (
    newNoteValues.title !== initialCreateNoteValue.title ||
    newNoteValues.content !== initialCreateNoteValue.content ||
    newNoteValues.isTrashed !== initialCreateNoteValue.isTrashed ||
    newNoteValues.isArchived !== initialCreateNoteValue.isArchived ||
    newNoteValues.isPinned !== initialCreateNoteValue.isPinned ||
    newNoteValues.color !== initialCreateNoteValue.color ||
    newNoteValues.reminder !== initialCreateNoteValue.reminder ||
    newNoteValues.createdAt !== initialCreateNoteValue.createdAt ||
    newNoteValues.updatedAt !== initialCreateNoteValue.updatedAt
  ) {
    return true; // Return true immediately if any non-array field has changed
  }

  // Check array fields by length
  if (
    newNoteValues.images.length !== initialCreateNoteValue.images.length ||
    newNoteValues.labelSet.length !== initialCreateNoteValue.labelSet.length ||
    newNoteValues.collaboratorList.length !==
      initialCreateNoteValue.collaboratorList.length
  ) {
    return true; // Return true if lengths are different, indicating a change
  }

  return false; // Return false if no changes are detected
};
