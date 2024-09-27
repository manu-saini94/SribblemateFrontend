import {
  BASE_URL_V1,
  CREATE_LABEL__URL,
  LABEL_FETCH_URL,
  UPDATE_LABEL__URL,
} from "api/serviceUtils";
import axios from "axios";
import { CreateLabelType, UpdateLabelType } from "labeltypes";

export const getAllLabelsByUser = () => {
  return axios.get(BASE_URL_V1 + LABEL_FETCH_URL);
};

export const createLabelForUser = (labelData: CreateLabelType) => {
  return axios.post(BASE_URL_V1 + CREATE_LABEL__URL, labelData);
};

export const updateLabelForUser = (labelData: UpdateLabelType) => {
  return axios.put(BASE_URL_V1 + UPDATE_LABEL__URL, labelData);
};
