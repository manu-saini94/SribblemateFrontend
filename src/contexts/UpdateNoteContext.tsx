import { UpdateNoteContextType } from "global";
import { createContext } from "react";
import { NoteCardType, SidebarMenus } from "utility/miscsUtils";
import { initialLoggedInUserValue } from "utility/reduxutils/authUtils";
import { initialNoteValue } from "utility/reduxutils/noteUtils";

const defaultNoteContext: UpdateNoteContextType = {
  activeCard: NoteCardType.NOTE,
  changeActiveCard: () => {},
  isUpdateCardActive: false,
  noteRef: {
    current: null,
  },
  pinIconRef: {
    current: null,
  },
  iconsRef: {
    current: null,
  },
  noteData: initialNoteValue,
  loggedInUserData: initialLoggedInUserValue,
  onModalPinClick: () => {},
  isListNote: false,
  onLabelRemoveClick: () => {},
  handleChange: () => {},
  handleNoteSubmit: () => {},
  onLabelAddIconClick: () => {},
  onCheckboxIconClick: () => {},
  activeMenu: SidebarMenus.Notes,
  changeColorClick: () => {},
  onDeleteClick: () => {},
  colorPaletteRef: {
    current: null,
  },
  onPinClick: () => {},
  onCollaboratorClick: () => {},
  onReminderClick: () => {},
  onArchiveClick: () => {},
  onMoreClick: () => {},
  onImageClick: () => {},
  toggleColorPalette: () => {},
  handleColorTooltipClose: () => {},
  handleColorTooltipOpen: () => {},
  handleMoreTooltipClose: () => {},
  handleMoreTooltipOpen: () => {},
  isOpenColorTooltip: false,
  isOpenMoreTooltip: false,
  checkForChange: () => false,
  getEditedDate: () => {},
  handleNoteCardClose: () => {},
};

const UpdateNoteContext =
  createContext<UpdateNoteContextType>(defaultNoteContext);

export default UpdateNoteContext;
