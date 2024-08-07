import { Id } from "@types/global";

export type CreateLabelType = {
  labelName: string;
};

export type LabelSetType = {
  labelArray: CreateLabelType[];
};

export type UpdateLabelType = CreateLabelType & Id;
