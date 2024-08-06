import { UpdateNoteType } from "@types/notetypes";

export type NoteStoreInitialStateType = {
  loading: Boolean;
  notes: UpdateNoteType[];
  error?: string;
};
