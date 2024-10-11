import { BASE_URL_V1, CHECK_USER_URL, FETCH_ALL_USERS } from "api/serviceUtils";
import axios from "axios";
import { CreateCollaboratorType } from "notetypes";

export const checkUserExist = async (
  collaboratorObject: CreateCollaboratorType
) => {
  return await axios.get(
    BASE_URL_V1 + CHECK_USER_URL + "/" + collaboratorObject.email
  );
};

export const fetchUsers = () => {
  return axios.get(BASE_URL_V1 + FETCH_ALL_USERS);
};
