import { AuthResponse } from "@types/authtypes";
import { CreateNoteType, UpdateNoteType } from "@types/notetypes";

export type Id = {
  id: number;
};

export type IconImageType = {
  x: number;
  y: number;
  src: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export interface ReactNodeHOCProps {
  children: ReactNode;
}
export interface ThemeContextType {
  isDarkMode: Boolean;
  toggleTheme: () => void;
}

export interface NoteContextType {
  noteData: CreateNoteType;
  handleChange: (event: {
    target: {
      name: any;
      value: any;
    };
  }) => void;
  changeColorClick: (color: string) => void;
  onCheckboxClick: () => void;
  onDeleteClick: () => void;
  onImageClick: () => void;
  onPinClick: () => void;
  onReminderClick: () => void;
}

export interface UpdateNoteContextType {
  noteData: UpdateNoteType;
  loggedInUserData: AuthResponse;
  onModalPinClick: () => void;
  isListNote: Boolean;
  onLabelRemoveClick: (id: numder) => void;
  handleChange: (event: {
    target: {
      name: any;
      value: any;
    };
  }) => void;
  handleNoteSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onLabelAddIconClick: () => void;
  onCheckboxIconClick: () => void;
  activeMenu: string;
  changeColorClick: (color: string) => void;
  onDeleteClick: () => void;
  colorPaletteRef: React.RefObject<HTMLDivElement>;
  onPinClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCollaboratorClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReminderClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onArchiveClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMoreClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onImageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toggleColorPalette: () => void;
  handleColorTooltipClose: () => void;
  handleColorTooltipOpen: () => void;
  handleMoreTooltipClose: () => void;
  handleMoreTooltipOpen: () => void;
  isOpenColorTooltip: Boolean;
  isOpenMoreTooltip: Boolean;
  checkForChange: () => Boolean;
  getEditedDate: () => any;
}

export interface NoteContextProps extends ReactNodeHOCProps {}

export interface UpdateNoteContextProps extends ReactNodeHOCProps {
  noteCardValues: UpdateNoteType;
}

export interface ThemeContextProps extends ReactNodeHOCProps {}

export type LabelEnum = {
  [key: string]: string;
};

export type GlobalInitialStateType = {
  loading: Boolean;
  error: string;
};

export type GlobalStoreInitialStateType = GlobalInitialStateType & {
  activeMenu: string;
  isSideBarCollapsed: Boolean;
  isMenuBarCollapsed: Boolean;
};

type AddLabelIconProps = {
  style?: React.CSSProperties;
};

// type LabelEnum = {
//   [key: string]: string;  // Simulating an Enum structure for labels
// };

// // This type will act like an Enum for dynamic labels
// let DynamicLabelMenus: LabelEnum = {};

// // Example API labels (you'll fetch this from your API)
// const fetchedLabels = ['Work', 'Personal', 'Urgent'];  // This is from API

// // Populate the DynamicLabelMenus object to act like an Enum
// fetchedLabels.forEach(label => {
//   DynamicLabelMenus[label] = label;
// });
