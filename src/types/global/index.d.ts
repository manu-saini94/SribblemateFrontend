import { CreateNoteType } from "@types/notetypes";

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
export interface ColorContextProps extends ReactNodeHOCProps {}

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
