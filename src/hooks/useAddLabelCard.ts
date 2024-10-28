import { LabelCardPropsType } from "notetypes";
import { FormEvent } from "react";
import { NoteCardType } from "utility/miscsUtils";

const useAddLabelCard = ({ changeActiveCard }: LabelCardPropsType) => {
  const handleLabelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeActiveCard(NoteCardType.NOTE);
  };
  return {
    handleLabelSubmit,
  };
};

export default useAddLabelCard;
