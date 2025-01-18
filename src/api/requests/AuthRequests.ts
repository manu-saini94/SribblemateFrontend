import {
  AUTH_URL,
  BASE_URL_V1,
  CHECK_USER_AUTH_URL,
  LOGIN_USER_URL,
  LOGOUT_USER_URL,
  REFRESH_TOKEN_URL,
  REGISTER_USER_URL,
} from "api/serviceUtils";
import { LoginCredentialsType, RegistrationDetailsType } from "authtypes";
import axios from "axios";

export const registerAuthUser = (
  registrationDetails: RegistrationDetailsType
) => {
  return axios.post(
    BASE_URL_V1 + AUTH_URL + REGISTER_USER_URL,
    registrationDetails,
    {
      withCredentials: true,
    }
  );
};

export const loginAuthUser = async (loginDetails: LoginCredentialsType) => {
  return axios.post(BASE_URL_V1 + AUTH_URL + LOGIN_USER_URL, loginDetails, {
    withCredentials: true,
  });
};

export const logoutAuthUser = async () => {
  return axios.delete(BASE_URL_V1 + AUTH_URL + LOGOUT_USER_URL, {
    withCredentials: true,
  });
};

export const refreshTokenForUser = () => {
  return axios.post(BASE_URL_V1 + AUTH_URL + REFRESH_TOKEN_URL, {
    withCredentials: true,
  });
};

export const checkUserAuthorization = () => {
  return axios.get(BASE_URL_V1 + AUTH_URL + CHECK_USER_AUTH_URL, {
    withCredentials: true,
  });
};
