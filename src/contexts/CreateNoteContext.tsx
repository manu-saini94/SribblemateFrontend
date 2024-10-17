import { NoteContextType } from "global";
import { createContext } from "react";
import { initialCreateNoteValue } from "utility/reduxutils/noteUtils";

const defaultNoteContext: NoteContextType = {
  noteData: initialCreateNoteValue,
  handleChange: () => {},
  onPinClick: () => {},
  onCheckboxClick: () => {},
  onDeleteClick: () => {},
  onLabelAddClick: () => {},
  onReminderClick: () => {},
  onImageClick: () => {},
  changeColorClick: () => {},
};

const CreateNoteContext = createContext<NoteContextType>(defaultNoteContext);

export default CreateNoteContext;
