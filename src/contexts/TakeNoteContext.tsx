import { createContext } from "react";

interface TakeNoteContextType {
  isTakeNoteActive: Boolean;
  setIsTakeNoteActive: (value: Boolean) => void;
}

// Define a default value that matches the ThemeContextType interface
const defaultTakeNoteContext: TakeNoteContextType = {
  isTakeNoteActive: true,
  setIsTakeNoteActive: (prevValue) => !prevValue,
};

const TakeNoteContext = createContext<TakeNoteContextType>(
  defaultTakeNoteContext
);

export default TakeNoteContext;
