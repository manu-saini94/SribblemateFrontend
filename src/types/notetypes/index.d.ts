import { Id } from "@types/global";
import { LabelSetType } from "@types/labeltypes";

export type ImageType = {
  image: string[];
};

export type CollaboratorType = {
  id: Id;
  email: string;
};

export type CollaboratorListType = {
  collaboratorArray: CollaboratorType[];
};

export type Note = {
  id: Id;
  title: string;
  content: string;
  images: ImageType;
  isTrashed: Boolean;
  isArchived: Boolean;
  isPinned: Boolean;
  color: string;
  reminder: string;
  createdAt: string;
  updatedAt: string;
  labelSet: LabelSetType;
  collaboratorList: CollaboratorListType;
};
