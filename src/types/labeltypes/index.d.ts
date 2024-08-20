import { CommonInitialState, Id } from "@types/global";

export type CreateLabelType = {
  labelName: string;
};

export type LabelSetType = {
  labelArray: CreateLabelType[];
};

export type UpdateLabelType = CreateLabelType & Id;

// Redux store types for Labels
export type LabelStoreInitialStateType = CommonInitialState & {
  labels: UpdateLabelType[];
};
