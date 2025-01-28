import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentialsType, RegistrationDetailsType } from "authtypes";
import { UserDetailsType } from "userstypes";
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
    loginUser: builder.mutation<UserDetailsType, LoginCredentialsType>({
      query: (loginCredentials) => ({
        url: LOGIN_USER_URL,
        method: HTTP_METHODS.POST,
        body: loginCredentials,
        credentials: "include",
        mode: "cors",
      }),
      transformResponse: (response: { object: UserDetailsType }) => {
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
    refreshAccessToken: builder.mutation<UserDetailsType, void>({
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
    checkAuthorizedUser: builder.query<UserDetailsType, void>({
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
  useLazyCheckAuthorizedUserQuery,
} = authApi;
