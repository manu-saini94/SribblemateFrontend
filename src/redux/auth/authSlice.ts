import { createSlice } from "@reduxjs/toolkit";
import {
  AuthStoreInitialStateType,
  LoginInitialStateType,
  RegisterInitialStateType,
  UserResponseType,
} from "authtypes";
import { loginUser, registerUser } from "../asyncThunks";

const loginInitialState: LoginInitialStateType = {
  loginLoading: false,
  token: null,
  loggedInUserData: {} as UserResponseType,
  loginError: null,
};

const registerInitialState: RegisterInitialStateType = {
  registerLoading: false,
  registerSuccess: false,
  registerError: null,
};

const initialState: AuthStoreInitialStateType = {
  ...loginInitialState,
  ...registerInitialState,
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
      state.loggedInUserData = {} as UserResponseType;
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
  },
});

export default authSlice.reducer;
