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
