import { AuthResponse } from "authtypes";
import { UserDto } from "userstypes";

export const getAuthConfig = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const initialUserDto: UserDto = {
  id: -1,
  fullName: "",
  email: "",
  status: "ACTIVE",
  createdAt: "",
  updatedAt: "",
  profilePicture: null,
};

export const initialLoggedInUserValue: AuthResponse = {
  userDto: initialUserDto,
  expiresIn: 0,
};
