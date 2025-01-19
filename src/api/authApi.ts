import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  LoginCredentialsType,
  RegistrationDetailsType,
} from "authtypes";
import {
  AUTH_URL,
  BASE_URL_V1,
  CHECK_USER_AUTH_URL,
  HTTP_METHODS,
  LOGIN_USER_URL,
  LOGOUT_USER_URL,
  REFRESH_TOKEN_URL,
  REGISTER_USER_URL,
} from "./serviceUtils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_V1 + AUTH_URL,
  }),
  tagTypes: ["Validate"],
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, LoginCredentialsType>({
      query: (loginCredentials) => ({
        url: LOGIN_USER_URL,
        method: HTTP_METHODS.POST,
        body: loginCredentials,
      }),
      transformResponse: (response: { object: AuthResponse }) => {
        return response.object;
      },
    }),
    registerUser: builder.mutation<Boolean, RegistrationDetailsType>({
      query: (registrationDetails) => ({
        url: REGISTER_USER_URL,
        method: HTTP_METHODS.POST,
        body: registrationDetails,
      }),
    }),
    refreshAccessToken: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: REFRESH_TOKEN_URL,
        method: HTTP_METHODS.POST,
      }),
    }),
    logoutUser: builder.mutation<Boolean, void>({
      query: () => ({
        url: LOGOUT_USER_URL,
        method: HTTP_METHODS.POST,
        credentials: "include",
      }),
    }),
    checkAuthorizedUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: CHECK_USER_AUTH_URL,
        method: HTTP_METHODS.GET,
        credentials: "include",
      }),
      providesTags: ["Validate"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshAccessTokenMutation,
  useLogoutUserMutation,
  useCheckAuthorizedUserQuery,
} = authApi;
