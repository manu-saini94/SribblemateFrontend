import { CreateLabelType } from "@types/labeltypes";
import { Id, ReactNodeHOCProps } from "global";

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
  images: string[];
  isTrashed: Boolean;
  isArchived: Boolean;
  isPinned: Boolean;
  color: string;
  reminder: string;
  createdAt: string;
  updatedAt: string;
  labelSet: CreateLabelType[];
  collaboratorList: CreateCollaboratorType[];
};

export type UpdateNoteType = CreateNoteType & Id;

export type NoteCardPropsType = {
  noteCardValues: UpdateNoteType;
  onNoteClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export type TakeNoteDetailsPropsType = {
  toggleTakeNoteActive: () => void;
};

interface ColorPaletteProps {
  onChangeColor?: (color: string) => void;
}

type ColorCircleProps = {
  colorItem: string;
  colorSelectClass: string;
};

export type TakeNotePropsType = {
  onTakeNoteClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export interface CommonNoteProps extends ReactNodeHOCProps {}

export interface TakeNoteContextType {
  isTakeNoteActive: Boolean;
  toggleTakeNoteActive: () => void;
}

export interface TakeNoteContextProps extends ReactNodeHOCProps {}

// Redux Store types for Notes

export type NoteInitialStateType = {
  loading: Boolean;
  error: string;
  createdNoteLoading: Boolean;
  createdNoteError: string;
  allLabelNotesLoading: Boolean;
  allLabelNotesError: string;
};

export type ByIdTransformType = {
  [id: number]: UpdateNoteType[];
};

export type NoteStoreInitialStateType = NoteInitialStateType & {
  createdNoteObject: UpdateNoteType;
  pinnedAndOthersNotes: UpdateNoteType[];
  allLabelNotes: UpdateNoteType[];
  allNotesByLabelId: ByIdTransformType;
};

export type ReminderNoteStoreInitialStateType = CommonInitialState & {
  reminderNotes: UpdateNoteType[];
};

export type LabelNoteStoreInitialState = NoteInitialStateType & {
  labelNotes: UpdateNoteType[];
};

export type ArchiveStoreInitialStateType = NoteInitialStateType & {
  archiveNotes: UpdateNoteType[];
};

export type StoreInitialStateType = NoteInitialStateType & {
  trashNotes: UpdateNoteType[];
};
