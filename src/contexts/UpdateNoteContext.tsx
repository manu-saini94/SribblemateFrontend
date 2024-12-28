import { UpdateNoteContextType } from "global";
import { createContext } from "react";
import { SidebarMenus } from "utility/miscsUtils";
import { initialLoggedInUserValue } from "utility/reduxutils/authUtils";
import { initialNoteValue } from "utility/reduxutils/noteUtils";

const defaultNoteContext: UpdateNoteContextType = {
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
};

const UpdateNoteContext =
  createContext<UpdateNoteContextType>(defaultNoteContext);

export default UpdateNoteContext;
