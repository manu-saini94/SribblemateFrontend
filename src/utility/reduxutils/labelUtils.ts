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

export const hasLabelChanged = (
  newLabelValues: UpdateLabelType,
  oldLabelValues: UpdateLabelType
): boolean => {
  if (newLabelValues.labelName !== oldLabelValues.labelName) {
    return true;
  }
  return false;
};
