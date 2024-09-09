import {
  BASE_URL_V1,
  config,
  CREATE_NOTE_URL,
  LABEL_URL,
  NOTE_FETCH_BY_REMINDER_URL,
  NOTE_FETCH_URL,
} from "api/serviceUtils";
import axios from "axios";
import { CreateNoteType } from "notetypes";

export const getAllNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_URL, config);
};

export const getAllLabelNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_URL + LABEL_URL + "all", config);
};

export const getAllNotesByLabel = (labelId: number) => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_URL + LABEL_URL, {
    ...config,
    params: labelId ? { labelId } : {},
  });
};
export const getAllReminderNotesByUser = () => {
  return axios.get(BASE_URL_V1 + NOTE_FETCH_BY_REMINDER_URL, config);
};

export const createNoteForUser = (createNoteData: CreateNoteType) => {
  return axios.post(BASE_URL_V1 + CREATE_NOTE_URL, createNoteData, config);
};
