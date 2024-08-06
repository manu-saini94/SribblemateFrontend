import { Id } from "@types/global";

export type UpdateLabelType = CreateLabelType & Id;

export type CreateLabelType = {
  labelName: string;
};

export type LabelSetType = {
  labelArray: CreateLabelType[];
};
