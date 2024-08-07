// Constants for validation errors and regex patterns
export const EMAIL_REGEX = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PWD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,16}$/;

export const EMAIL_RQD = "Email is required";
export const EMAIL_WARN = "Email address is invalid";
export const PWD_RQD = "Password is required";
export const PWD_WARN =
  "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8 to 16 characters long";
export const FULLNAME_RQD = "Full Name is required";
export const PWD_NOT_MATCH = "Passwords do not match";
