import {
  BASE_URL_V1,
  CHECK_USER_AUTH_URL,
  CREATE_NOTE_URL,
  LABEL_URL,
  NOTE_FETCH_BY_REMINDER_URL,
  NOTE_FETCH_URL,
  NOTE_UPDATE_PIN_URL,
  REFRESH_TOKEN_URL,
} from "api/serviceUtils";
import axios from "axios";
import { CreateNoteType } from "notetypes";

export const getAllNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_URL, { withCredentials: true });
};

export const getAllLabelNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_URL + LABEL_URL + "all", {
    withCredentials: true,
  });
};

export const refreshTokenForUser = () => {
  return axios.post(BASE_URL_V1 + REFRESH_TOKEN_URL, {
    withCredentials: true,
  });
};

export const getAllNotesByLabel = (labelId: number) => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_URL + LABEL_URL, {
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

// export const addCollaboratorToNote = (collaborator: string) => {
//   return axios.post(BASE_URL_V1 + CREATE_NOTE_URL, createNoteData);
// };

export const updatePinForUserNote = (noteId: number) => {
  return axios.put(BASE_URL_V1 + NOTE_UPDATE_PIN_URL, null, {
    params: { noteId },
    withCredentials: true,
  });
};
