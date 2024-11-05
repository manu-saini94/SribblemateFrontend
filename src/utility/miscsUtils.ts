import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LabelledNotesMenuIcon from "components/icons/LabelledNotesMenuIcon";
import { MenuItemType } from "sidebartypes";
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

export enum NoteCardType {
  COLLABORATOR,
  NOTE,
  LABEL,
}
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

export enum SidebarMenus {
  Notes = "Notes",
  Reminders = "Reminders",
  Archive = "Archive",
  Trash = "Trash",
  EditLabels = "Edit Labels",
  LabelledNotes = "Labelled Notes",
}

export const menuList: MenuItemType[] = [
  {
    name: SidebarMenus.Notes,
    path: "note",
    iconSrc: EditNoteOutlinedIcon,
  },
  {
    name: SidebarMenus.Reminders,
    path: "reminder",
    iconSrc: NotificationsActiveOutlinedIcon,
  },

  {
    name: SidebarMenus.Archive,
    path: "archive",
    iconSrc: ArchiveOutlinedIcon,
  },
  {
    name: SidebarMenus.Trash,
    path: "trash",
    iconSrc: DeleteOutlinedIcon,
  },
  {
    name: SidebarMenus.LabelledNotes,
    path: "labellednotes",
    iconSrc: LabelledNotesMenuIcon,
  },
  {
    name: SidebarMenus.EditLabels,
    path: "editlabels",
    iconSrc: EditOutlinedIcon,
  },
];
