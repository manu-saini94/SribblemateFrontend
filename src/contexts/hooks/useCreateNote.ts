import CreateNoteContext from "contexts/CreateNoteContext";
import { NoteContextType } from "global";
import { useContext } from "react";

export const useCreateNote = () =>
  useContext<NoteContextType>(CreateNoteContext);
