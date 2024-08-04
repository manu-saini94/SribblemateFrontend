import { Id } from "@types/global";

export type LabelType = {
  id: Id;
  labelName: string;
};

export type LabelSetType = {
  labelArray: LabelType[];
};
