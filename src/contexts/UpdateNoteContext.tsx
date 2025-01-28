import { UpdateNoteContextType } from "global";
import { createContext } from "react";
import { NoteCardType, SidebarMenus } from "utility/miscsUtils";
import { initialUserDetails } from "utility/reduxutils/authUtils";
import { initialNoteValue } from "utility/reduxutils/noteUtils";

const defaultNoteContext: UpdateNoteContextType = {
  activeCard: NoteCardType.NOTE,
  loading: true,
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
  loggedInUserData: initialUserDetails,
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
  handleAddLabel: () => {},
};

const UpdateNoteContext =
  createContext<UpdateNoteContextType>(defaultNoteContext);

export default UpdateNoteContext;
