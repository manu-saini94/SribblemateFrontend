import {
  BASE_URL_V1,
  LOGIN_USER_URL,
  REGISTER_USER_URL,
} from "api/serviceUtils";
import { LoginCredentialsType, RegistrationDetailsType } from "authtypes";
import axios from "axios";

export const registerAuthUser = (
  registrationDetails: RegistrationDetailsType
) => {
  return axios.post(BASE_URL_V1 + REGISTER_USER_URL, registrationDetails);
};

export const loginAuthUser = async (loginDetails: LoginCredentialsType) => {
  return await fetch(BASE_URL_V1 + LOGIN_USER_URL, {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the content type
    },
    credentials: "include", // Include credentials (cookies) in the request
    body: JSON.stringify(loginDetails), // Convert loginDetails to a JSON string
  });
};
