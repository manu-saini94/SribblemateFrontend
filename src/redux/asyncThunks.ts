import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createLabelForUser,
  deleteLabelForUser,
  getAllLabelsByUser,
  updateLabelForUser,
} from "api/requests/LabelRequests";
import { LoginCredentialsType, RegistrationDetailsType } from "authtypes";
import { CreateLabelType, UpdateLabelType } from "labeltypes";
import {
  CreateCollaboratorType,
  CreateNoteType,
  UpdateColorType,
  UpdateNoteType,
} from "notetypes";
import {
  loginAuthUser,
  logoutAuthUser,
  registerAuthUser,
} from "../api/requests/AuthRequests";
import {
  addCollaboratorForNote,
  checkUserAuthorization,
  createNoteForUser,
  deleteCollaboratorForNote,
  getAllLabelNotesByUser,
  getAllNotesByLabel,
  getAllNotesByUser,
  getAllReminderNotesByUser,
  refreshTokenForUser,
  updateArchiveForUserNote,
  updateColorForUserNote,
  updateNoteForUser,
  updatePinForUserNote,
  updateTrashForUserNote,
} from "../api/requests/NoteRequests";
import { checkUserExist, fetchUsers } from "../api/requests/UserRequests";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  (loginDetails: LoginCredentialsType) => {
    return loginAuthUser(loginDetails)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  (registrationDetails: RegistrationDetailsType) => {
    return registerAuthUser(registrationDetails)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  () => {
    return refreshTokenForUser()
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", () => {
  return logoutAuthUser()
    .then((response) => response.data.object)
    .catch((error) => {
      throw error.response.data.object;
    });
});

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () => {
  return getAllNotesByUser()
    .then((response) => response.data.object)
    .catch((error) => {
      throw error.response.data.object;
    });
});

export const checkAuthorizedUser = createAsyncThunk(
  "auth/checkAuthorizedUser",
  () => {
    return checkUserAuthorization()
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const fetchAllLabelNotes = createAsyncThunk(
  "notes/fetchAllLabelNotes",
  () => {
    return getAllLabelNotesByUser()
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const fetchNotesByLabel = createAsyncThunk(
  "notes/fetchNotesByLabel",
  (labelId: number) => {
    return getAllNotesByLabel(labelId)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", () => {
  return fetchUsers()
    .then((response) => response.data.object)
    .catch((error) => {
      throw error.response.data.object;
    });
});

export const checkCollaboratorExist = createAsyncThunk(
  "users/checkCollaboratorExist",
  (collaborator: CreateCollaboratorType) => {
    return checkUserExist(collaborator)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const addCollaborator = createAsyncThunk(
  "users/addCollaborator",
  ({
    collaborator,
    id,
  }: {
    collaborator: CreateCollaboratorType;
    id: number;
  }) => {
    return addCollaboratorForNote(collaborator, id)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const deleteCollaborator = createAsyncThunk(
  "users/deleteCollaborator",
  ({ noteId, collaboratorId }: { noteId: number; collaboratorId: number }) => {
    return deleteCollaboratorForNote(noteId, collaboratorId)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  (noteData: CreateNoteType) => {
    return createNoteForUser(noteData)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const updatePinForNote = createAsyncThunk(
  "notes/updatePin",
  (noteId: number) => {
    return updatePinForUserNote(noteId)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const updateNote = createAsyncThunk(
  "notes/update",
  (noteData: UpdateNoteType) => {
    return updateNoteForUser(noteData)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const updateArchiveForNote = createAsyncThunk(
  "notes/updateArchive",
  (noteId: number) => {
    return updateArchiveForUserNote(noteId)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const updateTrashForNote = createAsyncThunk(
  "notes/updateTrash",
  (noteId: number) => {
    return updateTrashForUserNote(noteId)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const updateColorForNote = createAsyncThunk(
  "notes/updateColor",
  (colorDetails: UpdateColorType) => {
    return updateColorForUserNote(colorDetails)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const createLabel = createAsyncThunk(
  "labels/createLabel",
  (labelData: CreateLabelType) => {
    return createLabelForUser(labelData)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  (labelData: UpdateLabelType) => {
    return updateLabelForUser(labelData)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  (id: number) => {
    return deleteLabelForUser(id)
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const fetchReminderNotes = createAsyncThunk(
  "reminderNotes/fetchNotes",
  () => {
    return getAllReminderNotesByUser()
      .then((response) => response.data.object)
      .catch((error) => {
        throw error.response.data.object;
      });
  }
);

export const fetchLabels = createAsyncThunk("labels/fetchLabels", () => {
  return getAllLabelsByUser()
    .then((response) => response.data.object)
    .catch((error) => {
      throw error.response.data.object;
    });
});
