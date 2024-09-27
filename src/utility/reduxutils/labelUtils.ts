import { CreateLabelType, UpdateLabelType } from "labeltypes";

export const initialCreateLabelValue: CreateLabelType = {
  labelName: "",
  createdAt: "",
  updatedAt: "",
  important: false,
};

export const initialLabelValue: UpdateLabelType = {
  id: -1,
  ...initialCreateLabelValue,
};
