import { CreateCollaboratorType } from "@types/notetypes";

export type UserDataType = {
  expiresIn: number;

  fullName: string;

  email: string;

  status: Utils.Status;

  createdAt: Date;

  updatedAt: Date;

  profilePicture: string;
};

interface UserDto {
  fullName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  profilePicture: string | null;
}

export type UsersInitialStateType = {
  collaboratorExistLoading: Boolean;
  collaboratorExistError: {};
  usersFetchLoading: Boolean;
  usersFetchError: string;
};

export type UsersStoreInitialStateType = UsersInitialStateType & {
  isExist: Boolean;
  collaboratorArray: CreateCollaboratorType[];
  allUsers: UserDto[];
};
