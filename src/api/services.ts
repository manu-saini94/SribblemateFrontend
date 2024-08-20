import { LoginCredentialsType, RegistrationDetailsType } from "authtypes";
import axios from "axios";
import { CreateNoteType } from "notetypes";
import {
  BASE_URL,
  CREATE_NOTE_URL,
  LABEL_FETCH_URL,
  NOTE_FETCH_BY_REMINDER_URL,
  NOTE_FETCH_URL,
  REGISTER_USER_URL,
} from "./serviceUtils";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getAllNotesByUser = () => {
  return axios.get(BASE_URL + NOTE_FETCH_URL, config);
};

export const getAllReminderNotesByUser = () => {
  return axios.get(BASE_URL + NOTE_FETCH_BY_REMINDER_URL, config);
};

export const getAllLabelsByUser = () => {
  return axios.get(BASE_URL + LABEL_FETCH_URL, config);
};

export const createNoteForUser = (createNoteData: CreateNoteType) => {
  return axios.post(BASE_URL + CREATE_NOTE_URL, createNoteData, config);
};

export const registerUser = (registrationDetails: RegistrationDetailsType) => {
  return axios.post(BASE_URL + REGISTER_USER_URL, registrationDetails);
};
export const loginUser = (loginDetails: LoginCredentialsType) => {
  return axios.post(BASE_URL + "/auth/login", loginDetails);
};
