import { UserDetailsType } from "userstypes";

export const getAuthConfig = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const initialUserDetails: UserDetailsType = {
  id: -1,
  fullName: "",
  email: "",
  status: "ACTIVE",
  createdAt: "",
  updatedAt: "",
  profilePicture: null,
};
