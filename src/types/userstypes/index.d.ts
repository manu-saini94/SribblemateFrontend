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
  collaboratorExistError: string;
  usersFetchLoading: Boolean;
  usersFetchError: string;
};

export type UsersStoreInitialStateType = UsersInitialStateType & {
  existingCollaborator: CreateCollaboratorType;
  collaboratorArray: CreateCollaboratorType[];
  newCollaboratorArray: CreateCollaboratorType[];
  currentCollaborator: CreateCollaboratorType;
  allUsers: UserDto[];
};

export type DisplayCollaboratorTypes = {
  collaborator: UpdateCollaboratorType;
  onCollabClick: (event: React.MouseEvent<HTMLElement>) => void;
};
