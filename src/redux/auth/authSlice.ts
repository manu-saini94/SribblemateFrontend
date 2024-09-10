import { createSlice } from "@reduxjs/toolkit";
import {
  AuthStoreInitialStateType,
  LoginInitialStateType,
  RegisterInitialStateType,
} from "authtypes";
import { loginUser, registerUser } from "../asyncThunks";

const loginInitialState: LoginInitialStateType = {
  loginLoading: false,
  token: null,
  loginSuccess: false,
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

const getCookie = (name: string) => {
  const cookieName = `${name}=`;
  console.log("cookies => ", document.cookie);
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  console.log("cookies => ", cookies);

  for (const cookie of cookies) {
    if (cookie.startsWith(cookieName)) {
      return decodeURIComponent(cookie.substring(cookieName.length));
    }
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    navigateAfterLogin(state) {
      // state.token = getCookie("accessToken");
      // console.log("auth Slice", state.token);

      // if (state.token) {
      //   window.location.replace("/note");
      // }
      // const cookies = document.cookie; // Add this log
      // console.log("All cookies:", cookies); // Log all cookies

      // state.token = getCookie("accessToken");
      // console.log("auth Slice", state.token);

      state.token = getCookie("accessToken");
    },
    navigateAfterRegistration(state) {
      window.location.replace("/login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginSuccess = action.payload;
      state.loginError = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginSuccess = false;
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

export const { navigateAfterLogin, navigateAfterRegistration } =
  authSlice.actions;

export default authSlice.reducer;
