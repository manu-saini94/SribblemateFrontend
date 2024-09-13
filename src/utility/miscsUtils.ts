// Constants for validation errors and regex patterns
import { MenuItemType } from "sidebartypes";
import AddLabelIcon from "../assets/addlabel.svg";
import ArchiveIcon from "../assets/archiveicon.svg";
import ReminderIcon from "../assets/bellicon.svg";
import NotesIcon from "../assets/notesicon.svg";
import TrashIcon from "../assets/trashicon.svg";
export const EMAIL_REGEX = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PWD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,16}$/;

export const EMAIL_RQD = "Email is required";
export const EMAIL_WARN = "Email address is invalid";
export const PWD_RQD = "Password is required";
export const PWD_WARN =
  "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8 to 16 characters long";
export const FULLNAME_RQD = "Full Name is required";
export const PWD_NOT_MATCH = "Passwords do not match";
export const colorList = [
  "#fff",
  "#faafa8",
  "#f39f76",
  "#fff8b8",
  "#e2f6d3",
  "#b4ddd3",
  "#d4e4ed",
  "#aeccdc",
  "#d3bfdb",
  "#f6e2dd",
  "#e9e3d4",
  "#efeff1",
];

export const menuList: MenuItemType[] = [
  {
    name: "Notes",
    path: "note",
    iconSrc: NotesIcon,
  },
  {
    name: "Reminders",
    path: "reminder",
    iconSrc: ReminderIcon,
  },
  {
    name: "Add labels",
    path: "edit",
    iconSrc: AddLabelIcon,
  },
  {
    name: "Archive",
    path: "archive",
    iconSrc: ArchiveIcon,
  },
  {
    name: "Trash",
    path: "trash",
    iconSrc: TrashIcon,
  },
];
