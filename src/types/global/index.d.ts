import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AuthResponse } from "@types/authtypes";
import {
  AllCategoriesNotesType,
  CreateNoteType,
  UpdateNoteType,
} from "@types/notetypes";

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
  loading: Boolean;
  activeCard: NoteCardType;
  isUpdateCardActive: Boolean;
  changeActiveCard: (cardType: NoteCardType) => void;
  noteRef: React.RefObject<HTMLDivElement>;
  pinIconRef: React.RefObject<HTMLDivElement>;
  iconsRef: React.RefObject<HTMLDivElement>;
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
  handleNoteCardClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toggleColorPalette: () => void;
  handleColorTooltipClose: () => void;
  handleColorTooltipOpen: () => void;
  handleMoreTooltipClose: () => void;
  handleMoreTooltipOpen: () => void;
  isOpenColorTooltip: Boolean;
  isOpenMoreTooltip: Boolean;
  checkForChange: () => Boolean;
  getEditedDate: () => any;
  handleAddLabel: () => void;
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
  error: string;
};

export type GlobalStoreInitialStateType = GlobalInitialStateType & {
  activeMenu: string;
  isUpdating: Boolean;
  isSideBarCollapsed: Boolean;
  isMenuBarCollapsed: Boolean;
};

type AddLabelIconProps = {
  style?: React.CSSProperties;
};

export type QueryStatesType = {
  notes: AllCategoriesNotesType;
  loading: Boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};
