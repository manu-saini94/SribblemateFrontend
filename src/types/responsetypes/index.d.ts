import { AuthResponse } from "@types/authtypes";
import { UpdateLabelType } from "@types/labeltypes";
import { UpdateCollaboratorType, UpdateNoteType } from "@types/notetypes";

interface ApiResponse<T> {
  messagecode: number;
  message: string;
  object: T;
}

export type ApiErrorResponse = ApiResponse<string>;

export type LabelsApiResponse = ApiResponse<UpdateLabelType[]>;
export type NotesApiResponse = ApiResponse<UpdateNoteType[]>;
export type AuthApiResponse = ApiResponse<AuthResponse>;
export type CollaboratorExistResponse = ApiResponse<UpdateCollaboratorType>;
export type AuthApiResponse = ApiResponse<AuthResponse>;
