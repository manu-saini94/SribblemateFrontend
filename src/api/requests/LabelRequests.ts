import {
  BASE_URL_V1,
  CREATE_LABEL_URL,
  DELETE_LABEL_URL,
  LABEL_FETCH_URL,
  UPDATE_LABEL_URL,
} from "api/serviceUtils";
import axios from "axios";
import { CreateLabelType, UpdateLabelType } from "labeltypes";

export const getAllLabelsByUser = () => {
  return axios.get(BASE_URL_V1 + LABEL_FETCH_URL);
};

export const createLabelForUser = (labelData: CreateLabelType) => {
  return axios.post(BASE_URL_V1 + CREATE_LABEL_URL, labelData);
};

export const updateLabelForUser = (labelData: UpdateLabelType) => {
  return axios.put(BASE_URL_V1 + UPDATE_LABEL_URL, labelData);
};

export const deleteLabelForUser = (id: number) => {
  return axios.delete(BASE_URL_V1 + DELETE_LABEL_URL, {
    params: { id },
  });
};
