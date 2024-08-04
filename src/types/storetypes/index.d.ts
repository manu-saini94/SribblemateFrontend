import { Note } from "@types/notetypes";

export type NoteStoreInitialStateType = {
  loading: Boolean;
  notes: Note[];
  error?: string;
};
