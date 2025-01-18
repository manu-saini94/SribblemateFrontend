export const BASE_URL = "http://localhost:8080";
export const BASE_URL_V1 = BASE_URL + "/api/v1";
export const AUTH_URL = "/auth";
export const NOTE_URL = "/note";
export const LABEL_URL = "/label";
export const USER_URL = "/users";

export const FETCH_ALL_USERS = USER_URL + "/get";
export const CHECK_USER_URL = USER_URL + "/email/exist";

export const CHECK_USER_AUTH_URL = AUTH_URL + "/validate";
export const REGISTER_USER_URL = AUTH_URL + "/signup";
export const LOGIN_USER_URL = AUTH_URL + "/login";
export const REFRESH_TOKEN_URL = AUTH_URL + "/refresh-token";
export const LOGOUT_USER_URL = AUTH_URL + "/logout";

export const NOTE_FETCH_URL = NOTE_URL + "/all";
export const CREATE_NOTE_URL = NOTE_URL + "/create";
export const NOTE_UPDATE_URL = NOTE_URL + "/update";
export const NOTE_FETCH_BY_REMINDER_URL = NOTE_FETCH_URL + "/reminder";
export const NOTE_UPDATE_PIN_URL = NOTE_UPDATE_URL + "/pin";
export const NOTE_UPDATE_ARCHIVE_URL = NOTE_UPDATE_URL + "/archive";
export const NOTE_UPDATE_TRASH_URL = NOTE_UPDATE_URL + "/trash";
export const NOTE_UPDATE_COLOR_URL = NOTE_UPDATE_URL + "/color";
export const NOTE_COLLABORATOR_ADD_URL = NOTE_URL + "/add/collaborator";
export const NOTE_COLLABORATOR_DELETE_URL = NOTE_URL + "/delete/collaborator";
export const NOTE_LABEL_ADD_URL = NOTE_URL + "/add/label";
export const NOTE_LABEL_DELETE_URL = NOTE_URL + "/delete/label";

export const LABEL_FETCH_URL = LABEL_URL + "/all";
export const CREATE_LABEL_URL = LABEL_URL + "/create";
export const UPDATE_LABEL_URL = LABEL_URL + "/update";
export const DELETE_LABEL_URL = LABEL_URL + "/delete";
