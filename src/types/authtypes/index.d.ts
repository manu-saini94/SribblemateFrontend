import { ReactNodeHOCProps } from "@types/global";

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

export type UserDataType = {
  expiresIn: number;

  fullName: string;

  email: string;

  status: Utils.Status;

  createdAt: Date;

  updatedAt: Date;

  profilePicture: string;
};

export type UserResponseType = {
  token: string;
  userDto: UserDataType;
};

export type LoginInitialStateType = {
  loginLoading: Boolean;
  token: string | null;
  loggedInUserData: UserResponseType;
  loginError: string | null;
};
export type RegisterInitialStateType = {
  registerLoading: Boolean;
  registerSuccess: Boolean;
  registerError: string | null;
};
export type AuthStoreInitialStateType = LoginInitialStateType &
  RegisterInitialStateType;
