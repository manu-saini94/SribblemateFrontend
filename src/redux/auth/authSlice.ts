import { createSlice } from "@reduxjs/toolkit";

import {
  AuthResponse,
  AuthStoreInitialStateType,
  LoginInitialStateType,
  LogoutInitialStateType,
  RefreshTokenInitialStateType,
  RegisterInitialStateType,
} from "authtypes";
import { initialLoggedInUserValue } from "utility/reduxutils/authUtils";
import {
  checkAuthorizedUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../asyncThunks";

const loginInitialState: LoginInitialStateType = {
  loginLoading: false,
  loginSuccess: false,
  loggedInUserData: {} as AuthResponse,
  loginError: null,
};

const registerInitialState: RegisterInitialStateType = {
  registerLoading: false,
  registerSuccess: false,
  registerError: null,
};

const refreshTokenInitialState: RefreshTokenInitialStateType = {
  refreshTokenError: null,
  refreshTokenLoading: false,
};

const logoutInitialState: LogoutInitialStateType = {
  logoutLoading: false,
  logoutError: null,
  logoutSuccess: false,
};

const initialState: AuthStoreInitialStateType = {
  ...loginInitialState,
  ...registerInitialState,
  ...refreshTokenInitialState,
  ...logoutInitialState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loggedInUserData = {} as AuthResponse;
        state.loginSuccess = false;
        state.loginError = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = true;
        state.loggedInUserData = action.payload;
        state.loginError = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loggedInUserData = {} as AuthResponse;
        state.loginError = action.error.message ?? "Failed to Authorize";
      })

      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = action.payload;
        state.registerError = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = false;
        state.registerError = action.error.message ?? "Failed to Register";
      })

      .addCase(refreshAccessToken.pending, (state) => {
        state.refreshTokenLoading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.refreshTokenLoading = false;
        state.loggedInUserData = action.payload;
        state.refreshTokenError = "";
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.refreshTokenLoading = false;
        state.loggedInUserData = {} as AuthResponse;
        state.refreshTokenError = action.error.message ?? "Failed to Refresh";
      })

      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.loginSuccess = false;
        state.loggedInUserData = initialLoggedInUserValue;
        state.logoutError = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.loginSuccess = true;
        state.logoutError = action.error.message ?? "Failed to Logout";
      })

      .addCase(checkAuthorizedUser.pending, (state) => {
        state.refreshTokenLoading = true;
      })
      .addCase(checkAuthorizedUser.fulfilled, (state, action) => {
        state.refreshTokenLoading = false;
        state.loggedInUserData = action.payload;
        state.refreshTokenError = "";
      })
      .addCase(checkAuthorizedUser.rejected, (state, action) => {
        state.refreshTokenLoading = false;
        state.loggedInUserData = {} as AuthResponse;
        state.refreshTokenError = action.error.message ?? "Failed to Authorize";
      });
  },
});

export default authSlice.reducer;
