import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetailsType } from "userstypes";

import { AuthStoreType } from "authtypes";

const initialState: AuthStoreType = {
  authLoading: false,
  loginSuccess: false,
  logoutSuccess: false,
  authUserData: {} as UserDetailsType,
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUserData: (state, action: PayloadAction<AuthStoreType>) => {
      state.authUserData = action.payload.authUserData;
      state.loginSuccess = action.payload.loginSuccess;
      state.logoutSuccess = action.payload.logoutSuccess;
      state.authLoading = action.payload.authLoading;
      state.authError = action.payload.authError;
    },
  },
});

export const { setAuthUserData } = authSlice.actions;

export default authSlice.reducer;
