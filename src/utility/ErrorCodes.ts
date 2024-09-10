export const ErrorCode = {
  // JWT and Refresh Token Errors
  JWT_SIGNATURE_INVALID: "JWT_SIGNATURE_INVALID",
  JWT_TOKEN_EXPIRED: "JWT_TOKEN_EXPIRED",
  REFRESH_TOKEN_EXPIRED: "REFRESH_TOKEN_EXPIRED",
  REFRESH_TOKEN_MISSING_OR_INVALID: "REFRESH_TOKEN_MISSING_OR_INVALID",

  // Account and Authentication Errors
  ACCOUNT_IS_LOCKED: "ACCOUNT_IS_LOCKED",
  USERNAME_OR_PASSWORD_INCORRECT: "USERNAME_OR_PASSWORD_INCORRECT",
  NOT_AUTHORIZED_TO_ACCESS: "NOT_AUTHORIZED_TO_ACCESS",

  // Note Errors
  NOTE_PERSIST_ERROR: "NOTE_PERSIST_ERROR",
  NOTE_NOT_FOUND: "NOTE_NOT_FOUND",
  NOTES_NOT_FOUND: "NOTES_NOT_FOUND",
  NOTE_UPDATE_ERROR: "NOTE_UPDATE_ERROR",
  NOTES_NOT_FOUND_FOR_USER: "NOTES_NOT_FOUND_FOR_USER",
  ERROR_FETCHING_NOTES_FOR_USER: "ERROR_FETCHING_NOTES_FOR_USER",

  // User Errors
  ERROR_PERSISTING_USER: "ERROR_PERSISTING_USER",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXIST: "USER_ALREADY_EXIST",
  USER_NOT_DELETED: "USER_NOT_DELETED",
  USER_IS_INACTIVE: "USER_IS_INACTIVE",

  // Label Errors
  LABEL_PERSIST_ERROR: "LABEL_PERSIST_ERROR",
  LABELS_NOT_FOUND: "LABELS_NOT_FOUND",
  LABEL_DELETE_ERROR: "LABEL_DELETE_ERROR",
  LABEL_UPDATE_ERROR: "LABEL_UPDATE_ERROR",

  // Internal Errors
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  // General
  DESCRIPTION: "DESCRIPTION",
};