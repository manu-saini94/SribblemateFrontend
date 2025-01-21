import { UpdateCollaboratorType } from "@types/notetypes";

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
  id: number;
  fullName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  profilePicture: string | null;
}

export type UsersInitialStateType = {
  collaboratorCreateLoading: Boolean;
  collaboratorCreateError: string;
  usersFetchLoading: Boolean;
  usersFetchError: string;
};

export type UsersStoreInitialStateType = UsersInitialStateType & {
  existingCollaborator: UpdateCollaboratorType;
  collaboratorArray: UpdateCollaboratorType[];
  newCollaboratorArray: UpdateCollaboratorType[];
  currentCollaborator: UpdateCollaboratorType;
  allUsers: UserDto[];
};

export type DisplayCollaboratorTypes = {
  collaborator: UpdateCollaboratorType;
  onCollabClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
