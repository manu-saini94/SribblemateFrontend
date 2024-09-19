import {
  BASE_URL_V1,
  CREATE_LABEL__URL,
  LABEL_FETCH_URL,
} from "api/serviceUtils";
import axios from "axios";
import { CreateLabelType } from "labeltypes";

export const getAllLabelsByUser = () => {
  return axios.get(BASE_URL_V1 + LABEL_FETCH_URL);
};

export const createLabelForUser = (labelData: CreateLabelType) => {
  return axios.post(BASE_URL_V1 + CREATE_LABEL__URL, labelData);
};
