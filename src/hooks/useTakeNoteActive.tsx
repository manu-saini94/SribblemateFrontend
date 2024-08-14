import TakeNoteContext from "contexts/TakeNoteContext";
import { TakeNoteContextType } from "notetypes";
import { useContext } from "react";

export const useTakeNoteActive = () =>
  useContext<TakeNoteContextType>(TakeNoteContext);
