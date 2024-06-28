import axios from "axios";
import { BASE_URL } from "../utility";

export const getAllNotesByUserId = (id) => {
  return axios.get(BASE_URL + "/users/" + id);
};

export const registerUser = (registrationDetails) => {
  return axios.post(BASE_URL + "/auth/signup", registrationDetails);
};
