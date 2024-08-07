import { UpdateLabelType } from "@types/labeltypes";
import { UpdateNoteType } from "@types/notetypes";

export type NoteInitialStateType = {
  loading: Boolean;
  error: string;
};

export type LabelStoreInitialStateType = NoteInitialStateType & {
  labels: UpdateLabelType[];
};

export type NoteStoreInitialStateType = NoteInitialStateType & {
  notes: UpdateNoteType[];
};

export type ReminderNoteStoreInitialStateType = NoteInitialStateType & {
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
