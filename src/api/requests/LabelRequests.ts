import {
  BASE_URL_V1,
  CREATE_LABEL_URL,
  DELETE_LABEL_URL,
  LABEL_FETCH_URL,
  LABEL_URL,
  UPDATE_LABEL_URL,
} from "api/serviceUtils";
import axios from "axios";
import { CreateLabelType, UpdateLabelType } from "labeltypes";

export const getAllLabelsByUser = () => {
  return axios.get(BASE_URL_V1 + LABEL_URL + LABEL_FETCH_URL, {
    withCredentials: true,
  });
};

export const createLabelForUser = (labelData: CreateLabelType) => {
  return axios.post(BASE_URL_V1 + LABEL_URL + CREATE_LABEL_URL, labelData, {
    withCredentials: true,
  });
};

export const updateLabelForUser = (labelData: UpdateLabelType) => {
  return axios.put(BASE_URL_V1 + LABEL_URL + UPDATE_LABEL_URL, labelData, {
    withCredentials: true,
  });
};

export const deleteLabelForUser = (id: number) => {
  return axios.delete(BASE_URL_V1 + LABEL_URL + DELETE_LABEL_URL, {
    params: { id },
    withCredentials: true,
  });
};
