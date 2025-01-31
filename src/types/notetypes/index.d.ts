import { CreateLabelType } from "@types/labeltypes";
import { Id, ReactNodeHOCProps } from "global";

export type ImageType = {
  image: string[];
};

export type UpdateCollaboratorType = CreateCollaboratorType & Id;

export type CollaboratorPropsType = {
  collaborator: CreateCollaboratorType | UpdateCollaboratorType;
};

export type CreateCollaboratorType = {
  name: string;
  email: string;
};

export type ListItemType = {
  content: string;
  done: Boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
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
  listItems: ListItemType[];
  labelSet: CreateLabelType[];
  collaboratorList: CreateCollaboratorType[];
};

export type UpdateNoteType = {
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
  createdBy: UpdateCollaboratorType;
  updatedBy: UpdateCollaboratorType;
  listItems: ListItemType[];
  labelSet: UpdateLabelType[];
  collaboratorList: UpdateCollaboratorType[];
} & Id;

export type UpdateNote = CreateNoteType & Id;

export type NoteCardPropsType = {
  noteCardValues: UpdateNoteType;
};

export type ModalNotePropsType = {
  noteCardValues: UpdateNoteType;
  isUpdateCardActive: Boolean;
  handleNoteCardClose: (event: React.MouseEvent<HTMLElement>) => void;
};

export type TakeNoteDetailsType = {
  toggleTakeNoteActive: () => void;
};

export type TakeNoteDetailsPropsType = {
  changeActiveCard: (cardType: NoteCardType) => void;
  toggleTakeNoteActive: () => void;
};

export type CollaboratorCardPropsType = {
  changeActiveCard: (cardType: NoteCardType) => void;
};

export type LabelCardPropsType = {
  changeActiveCard: (cardType: NoteCardType) => void;
};

export type UpdateColorType = {
  noteId: number;
  color: string;
};

interface ColorPaletteProps {
  color: string;
  onChangeColor: (color: string) => void;
}

type ColorCircleProps = {
  colorItem: string;
  colorSelectClass: string;
  onChangeColor: (color: string) => void;
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
  [id: number]: number[];
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
  notesByLabelId: ByIdTransformType;
  currentLabelIds: number[];
  updatedNote: UpdateNoteType;
};

export type AllCategoriesNotesType = {
  pinnedNotes: UpdateNoteType[];
  othersNotes: UpdateNoteType[];
  archivedNotes?: UpdateNoteType[];
};

export type NotesStateType = {
  notes: UpdateNoteType[];
  notesById: { [id: number]: UpdateNoteType };
};
