import {
  BASE_URL_V1,
  CHECK_USER_AUTH_URL,
  CREATE_NOTE_URL,
  LABEL_URL,
  NOTE_COLLABORATOR_ADD_URL,
  NOTE_COLLABORATOR_DELETE_URL,
  NOTE_FETCH_BY_REMINDER_URL,
  NOTE_FETCH_URL,
  NOTE_LABEL_ADD_URL,
  NOTE_LABEL_DELETE_URL,
  NOTE_UPDATE_ARCHIVE_URL,
  NOTE_UPDATE_COLOR_URL,
  NOTE_UPDATE_PIN_URL,
  NOTE_UPDATE_TRASH_URL,
  NOTE_UPDATE_URL,
  NOTE_URL,
  REFRESH_TOKEN_URL,
} from "api/serviceUtils";
import axios from "axios";
import { CreateNoteType, UpdateColorType, UpdateNoteType } from "notetypes";

export const getAllNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_URL, { withCredentials: true });
};

export const getAllLabelNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_URL + LABEL_URL + "/all", {
    withCredentials: true,
  });
};

export const refreshTokenForUser = () => {
  return axios.post(BASE_URL_V1 + REFRESH_TOKEN_URL, {
    withCredentials: true,
  });
};

export const getAllNotesByLabel = (labelId: number) => {
  return axios.get(BASE_URL_V1 + NOTE_URL + LABEL_URL, {
    params: labelId ? { labelId } : {},
    withCredentials: true,
  });
};

export const getAllReminderNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_BY_REMINDER_URL, {
    withCredentials: true,
  });
};

export const createNoteForUser = (createNoteData: CreateNoteType) => {
  return axios.post(BASE_URL_V1 + CREATE_NOTE_URL, createNoteData, {
    withCredentials: true,
  });
};

export const checkUserAuthorization = () => {
  return axios.get(BASE_URL_V1 + CHECK_USER_AUTH_URL, {
    withCredentials: true,
  });
};

export const addCollaboratorForNote = (
  collaboratorEmail: string,
  noteId: number
) => {
  return axios.post(BASE_URL_V1 + NOTE_COLLABORATOR_ADD_URL, null, {
    params: { noteId, collaboratorEmail },
    withCredentials: true,
  });
};

export const deleteCollaboratorForNote = (
  noteId: number,
  collaboratorEmail: string
) => {
  return axios.delete(BASE_URL_V1 + NOTE_COLLABORATOR_DELETE_URL, {
    params: { noteId, collaboratorEmail },
    withCredentials: true,
  });
};

export const addLabelInsideNote = (noteId: number, labelId: number) => {
  return axios.post(BASE_URL_V1 + NOTE_LABEL_ADD_URL, null, {
    params: { noteId, labelId },
    withCredentials: true,
  });
};

export const deleteLabelInsideNote = (noteId: number, labelId: number) => {
  return axios.delete(BASE_URL_V1 + NOTE_LABEL_DELETE_URL, {
    params: { noteId, labelId },
    withCredentials: true,
  });
};

export const updatePinForUserNote = (noteId: number) => {
  return axios.put(BASE_URL_V1 + NOTE_UPDATE_PIN_URL, null, {
    params: { noteId },
    withCredentials: true,
  });
};

export const updateNoteForUser = (noteData: UpdateNoteType) => {
  return axios.put(BASE_URL_V1 + NOTE_UPDATE_URL, noteData, {
    withCredentials: true,
  });
};

export const updateColorForUserNote = (colorDetails: UpdateColorType) => {
  return axios.put(BASE_URL_V1 + NOTE_UPDATE_COLOR_URL, colorDetails, {
    withCredentials: true,
  });
};

export const updateArchiveForUserNote = (noteId: number) => {
  return axios.put(BASE_URL_V1 + NOTE_UPDATE_ARCHIVE_URL, null, {
    params: { noteId },
    withCredentials: true,
  });
};

export const updateTrashForUserNote = (noteId: number) => {
  return axios.put(BASE_URL_V1 + NOTE_UPDATE_TRASH_URL, null, {
    params: { noteId },
    withCredentials: true,
  });
};
