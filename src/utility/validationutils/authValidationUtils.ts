import {
  EMAIL_REGEX,
  EMAIL_RQD,
  EMAIL_WARN,
  FULLNAME_RQD,
  PWD_NOT_MATCH,
  PWD_REGEX,
  PWD_RQD,
  PWD_WARN,
} from "utility/miscsUtils";

export const validateEmail = (email: string): string => {
  if (!email) {
    return EMAIL_RQD;
  } else if (!EMAIL_REGEX.test(email)) {
    return EMAIL_WARN;
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return PWD_RQD;
  } else if (!PWD_REGEX.test(password)) {
    return PWD_WARN;
  }
  return "";
};

export const validateFullName = (fullName: string): string => {
  if (!fullName) {
    return FULLNAME_RQD;
  }
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!password) {
    return "Confirm " + PWD_RQD;
  } else if (password !== confirmPassword) {
    return PWD_NOT_MATCH;
  }
  return "";
};
