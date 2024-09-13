import { BASE_URL_V1, LABEL_FETCH_URL } from "api/serviceUtils";
import axios from "axios";

export const getAllLabelsByUser = () => {
  return axios.get(BASE_URL_V1 + LABEL_FETCH_URL);
};
