import { AuthResponse } from "@types/authtypes";
import { CreateLabelType } from "@types/labeltypes";
import { Id, ReactNodeHOCProps } from "global";

export type ImageType = {
  image: string[];
};

export type UpdateCollaboratorType = CreateCollaboratorType & Id;

export type CollaboratorPropsType = {
  loggedInUserData: AuthResponse;
};

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
  trashed: Boolean;
  archived: Boolean;
  pinned: Boolean;
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

export type TakeNoteDetailsType = {
  toggleTakeNoteActive: () => void;
};

export type TakeNoteDetailsPropsType = {
  changeActiveCard: (cardType: NoteCardType) => void;
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
  notesByLabelIdLoading: Boolean;
  notesByLabelIdError: string;
  noteUpdateLoading: Boolean;
  noteUpdateError: string;
};

interface NormalizedNotes {
  notesById: { [id: number]: UpdateNoteType };
  allIds: number[];
  pinnedIds: number[];
  archiveIds: number[];
  othersIds: number[];
  trashIds: number[];
  hasLabelIds: number[];
  hasReminderIds: number[];
}

export type ByIdTransformType = {
  [id: number]: UpdateNoteType[];
};

export type NotesPropsType = {
  notes: UpdateNoteType[];
};

export type NoteStoreInitialStateType = NoteInitialStateType & {
  labelId: number;
  createdNoteObject: UpdateNoteType;
  notesById: { [id: number]: UpdateNoteType };
  allIds: number[];
  pinnedIds: number[];
  archiveIds: number[];
  othersIds: number[];
  trashIds: number[];
  hasLabelIds: number[];
  hasReminderIds: number[];
  allLabelNotes: UpdateNoteType[];
  notesByLabelId: ByIdTransformType;
  currentLabelNotes: UpdateNoteType[];
  updatedNote: UpdateNoteType;
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
