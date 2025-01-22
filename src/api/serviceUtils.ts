export const BASE_URL = "http://localhost:8080";
export const BASE_URL_V1 = BASE_URL + "/api/v1";
export const AUTH_URL = "/auth";
export const NOTE_URL = "/note";
export const LABEL_URL = "/label";
export const USER_URL = "/users";

export const FETCH_ALL_USERS = USER_URL + "/get";
export const CHECK_USER_URL = USER_URL + "/email/exist";

export const CHECK_USER_AUTH_URL = "/validate";
export const REGISTER_USER_URL = "/signup";
export const LOGIN_USER_URL = "/login";
export const REFRESH_TOKEN_URL = "/refresh-token";
export const LOGOUT_USER_URL = "/logout";

export const NOTE_FETCH_URL = "/all";
export const CREATE_NOTE_URL = "/create";
export const NOTE_UPDATE_URL = "/update";
export const NOTE_FETCH_BY_REMINDER_URL = NOTE_FETCH_URL + "/reminder";
export const NOTE_UPDATE_PIN_URL = NOTE_UPDATE_URL + "/pin";
export const NOTE_UPDATE_ARCHIVE_URL = NOTE_UPDATE_URL + "/archive";
export const NOTE_UPDATE_TRASH_URL = NOTE_UPDATE_URL + "/trash";
export const NOTE_UPDATE_COLOR_URL = NOTE_UPDATE_URL + "/color";
export const NOTE_COLLABORATOR_ADD_URL = "/add/collaborator";
export const NOTE_COLLABORATOR_DELETE_URL = "/delete/collaborator";
export const NOTE_LABEL_ADD_URL = "/add/label";
export const NOTE_LABEL_DELETE_URL = "/delete/label";

export const LABEL_FETCH_URL = "/all";
export const CREATE_LABEL_URL = "/create";
export const UPDATE_LABEL_URL = "/update";
export const DELETE_LABEL_URL = "/delete";

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
  HEAD: "HEAD",
};

export function providesList<
  R extends { id: string | number }[],
  T extends string
>(resultsWithIds: R | undefined, tagType: T) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}
