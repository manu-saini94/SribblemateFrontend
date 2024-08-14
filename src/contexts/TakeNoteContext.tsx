import { TakeNoteContextType } from "notetypes";
import { createContext } from "react";

// Define a default value that matches the ThemeContextType interface
const defaultTakeNoteContext: TakeNoteContextType = {
  isTakeNoteActive: true,
  setIsTakeNoteActive: () => false,
};

const TakeNoteContext = createContext<TakeNoteContextType>(
  defaultTakeNoteContext
);

export default TakeNoteContext;
