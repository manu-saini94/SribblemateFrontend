import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createLabelForUser,
  deleteLabelForUser,
  getAllLabelsByUser,
  updateLabelForUser,
} from "api/requests/LabelRequests";
import { LoginCredentialsType, RegistrationDetailsType } from "authtypes";
import { CreateLabelType, UpdateLabelType } from "labeltypes";
import { CreateCollaboratorType, CreateNoteType } from "notetypes";
import { loginAuthUser, registerAuthUser } from "../api/requests/AuthRequests";
import {
  createNoteForUser,
  getAllLabelNotesByUser,
  getAllNotesByLabel,
  getAllNotesByUser,
  getAllReminderNotesByUser,
  refreshTokenForUser,
  updatePinForUserNote,
} from "../api/requests/NoteRequests";
import { checkUserExist, fetchUsers } from "../api/requests/UserRequests";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  (loginDetails: LoginCredentialsType) => {
    return loginAuthUser(loginDetails).then((response) => response.data.object);
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

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async () => {
    return refreshTokenForUser().then((response) => response.data.object);
  }
);

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

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", () => {
  return fetchUsers().then((response) => response.data.object);
});

export const checkCollaboratorExist = createAsyncThunk(
  "users/checkCollaboratorExist",
  (email: CreateCollaboratorType) => {
    return checkUserExist(email)
      .then((response) => response.data.object)
      .catch((error) => {
        console.log("ER:", error);

        throw error.response.data;
      });
  }
);

// export const createCollaborator = createAsyncThunk(
//   "note/createCollaborator",
//   (collaborator: string) => {
//     return addCollaboratorToNote(collaborator).then(
//       (response) => response.data.object
//     );
//   }
// );

export const createNote = createAsyncThunk(
  "notes/createNote",
  (noteData: CreateNoteType) => {
    return createNoteForUser(noteData).then((response) => response.data.object);
  }
);

export const updatePinForNote = createAsyncThunk(
  "notes/updatePin",
  (noteId: number) => {
    return updatePinForUserNote(noteId).then(
      (response) => response.data.object
    );
  }
);

export const createLabel = createAsyncThunk(
  "labels/createLabel",
  (labelData: CreateLabelType) => {
    return createLabelForUser(labelData).then(
      (response) => response.data.object
    );
  }
);

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  (labelData: UpdateLabelType) => {
    return updateLabelForUser(labelData).then(
      (response) => response.data.object
    );
  }
);

export const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  (id: number) => {
    return deleteLabelForUser(id).then((response) => response.data.object);
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
