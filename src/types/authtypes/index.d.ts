import { ReactNodeHOCProps } from "@types/global";
import { UserDto } from "@types/userstypes";

export type LoginCredentialsType = {
  email: string;
  password: string;
};

export type TokenString = {
  token: string;
};

export type LoginPropsType = {
  setToken: (token: tokenString) => void;
};

export type RegistrationDetailsType = {
  fullName: string;
  email: string;
  password: string;
};

export type ConfirmPasswordType = {
  confirmPassword: string;
};

export interface AuthProps extends ReactNodeHOCProps {}

export type WithAuthProps = {
  setToken: (token: string) => void;
};

interface AuthResponse {
  userDto: UserDto;
  expiresIn: number;
}

export type LoginInitialStateType = {
  loginLoading: Boolean;
  loginSuccess: Boolean;
  loggedInUserData: AuthResponse;
  loginError: string | null;
};
export type RegisterInitialStateType = {
  registerLoading: Boolean;
  registerSuccess: Boolean;
  registerError: string | null;
};

export type RefreshTokenInitialStateType = {
  refreshTokenLoading: Boolean;
  refreshTokenError: string | null;
};

export type LogoutInitialStateType = {
  logoutLoading: Boolean;
  logoutError: string | null;
  logoutSuccess: Boolean;
};

export type AuthStoreInitialStateType = LoginInitialStateType &
  RegisterInitialStateType &
  RefreshTokenInitialStateType &
  LogoutInitialStateType;
