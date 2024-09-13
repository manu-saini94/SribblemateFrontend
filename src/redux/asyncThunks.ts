import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLabelsByUser } from "api/requests/LabelRequests";
import { LoginCredentialsType, RegistrationDetailsType } from "authtypes";
import { CreateNoteType } from "notetypes";
import { loginAuthUser, registerAuthUser } from "../api/requests/AuthRequests";
import {
  createNoteForUser,
  getAllLabelNotesByUser,
  getAllNotesByLabel,
  getAllNotesByUser,
  getAllReminderNotesByUser,
} from "../api/requests/NoteRequests";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  (loginDetails: LoginCredentialsType) => {
    return loginAuthUser(loginDetails).then((response) => response.data);
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  (registrationDetails: RegistrationDetailsType) => {
    return registerAuthUser(registrationDetails).then(
      (response) => response.data.object
    );
  }
);

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  return getAllNotesByUser().then((response) => response.data.object);
});

export const fetchAllLabelNotes = createAsyncThunk(
  "notes/fetchAllLabelNotes",
  () => {
    return getAllLabelNotesByUser().then((response) => response.data.object);
  }
);

export const fetchNotesByLabel = createAsyncThunk(
  "notes/fetchNotesByLabel",
  (labelId: number) => {
    return getAllNotesByLabel(labelId).then((response) => response.data.object);
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  (noteData: CreateNoteType) => {
    return createNoteForUser(noteData).then((response) => response.data.object);
  }
);

export const fetchReminderNotes = createAsyncThunk(
  "reminderNotes/fetchNotes",
  () => {
    return getAllReminderNotesByUser().then((response) => response.data.object);
  }
);

export const fetchLabels = createAsyncThunk("labels/fetchLabels", () => {
  return getAllLabelsByUser().then((response) => response.data.object);
});
