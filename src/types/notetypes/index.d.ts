import { Id, ReactNodeHOCProps } from "@types/global";
import { LabelSetType } from "@types/labeltypes";

export type ImageType = {
  image: string[];
};

export type UpdateCollaboratorType = CreateCollaboratorType & Id;

export type CreateCollaboratorType = {
  email: string;
};

export type CollaboratorListType = {
  collaboratorArray: CreateCollaboratorType[];
};

export type CreateNoteType = {
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

export type UpdateNoteType = CreateNoteType & Id;

export type NoteCardPropsType = {
  noteCardValues: UpdateNoteType;
} & TakeNoteDetailsPropsType;

export type TakeNoteDetailsPropsType = {
  setIsTakeNoteActive: (value: Boolean) => void;
};

interface ColorPaletteProps {
  onChangeColor?: (color: string) => void;
}

type ColorCircleProps = {
  colorItem: string;
  onColorClick: (color: string) => void;
  colorSelectClass: string;
};

export interface CommonNoteProps extends ReactNodeHOCProps {}
