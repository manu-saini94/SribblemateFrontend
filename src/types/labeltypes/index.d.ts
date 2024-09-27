import { Id } from "@types/global";

export type CreateLabelType = {
  labelName: string;
  createdAt: string;
  updatedAt: string;
  important: boolean;
};

export type LabelSetType = {
  labelArray: CreateLabelType[];
};

export type UpdateLabelType = CreateLabelType & Id;

export type LabelInitialStateType = {
  loading: Boolean;
  error: string;
  createdLabelLoading: Boolean;
  createdLabelError: string;
  updateLabelLoading: Boolean;
  updateLabelError: string;
};

// Redux store types for Labels
export type LabelStoreInitialStateType = LabelInitialStateType & {
  labels: UpdateLabelType[];
  createdLabelObject: UpdateLabelType;
  updateLabelObject: UpdateLabelType;
};

export type UpdateLabelCardPropsType = {
  label: UpdateLabelType;
  index: number;
};
