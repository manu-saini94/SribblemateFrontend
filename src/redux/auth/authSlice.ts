import { createSlice } from "@reduxjs/toolkit";

import {
  AuthResponse,
  AuthStoreInitialStateType,
  LoginInitialStateType,
  RefreshTokenInitialStateType,
  RegisterInitialStateType,
} from "authtypes";
import { loginUser, refreshAccessToken, registerUser } from "../asyncThunks";

const loginInitialState: LoginInitialStateType = {
  loginLoading: false,
  token: null,
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

const initialState: AuthStoreInitialStateType = {
  ...loginInitialState,
  ...registerInitialState,
  ...refreshTokenInitialState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loggedInUserData = action.payload;
      localStorage.setItem("token", action.payload.token);
      state.loginError = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginLoading = false;
      state.loggedInUserData = {} as AuthResponse;
      state.loginError = action.error.message ?? "Failed to Authorize";
    });
    builder.addCase(registerUser.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerLoading = false;
      state.registerSuccess = action.payload;
      state.registerError = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerLoading = false;
      state.registerSuccess = false;
      state.registerError = action.error.message ?? "Failed to Register";
    });
    builder.addCase(refreshAccessToken.pending, (state) => {
      state.refreshTokenLoading = true;
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.refreshTokenLoading = false;
      state.loggedInUserData = action.payload;
      state.refreshTokenError = "";
    });
    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.refreshTokenLoading = false;
      state.loggedInUserData = {} as AuthResponse;
      state.refreshTokenError = action.error.message ?? "Failed to Register";
    });
  },
});

export default authSlice.reducer;
