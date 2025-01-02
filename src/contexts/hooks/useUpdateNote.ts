import UpdateNoteContext from "contexts/UpdateNoteContext";
import { UpdateNoteContextType } from "global";
import { useContext } from "react";

export const useUpdateNote = () =>
  useContext<UpdateNoteContextType>(UpdateNoteContext);
