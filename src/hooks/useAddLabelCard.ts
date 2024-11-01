import { LabelCardPropsType } from "notetypes";
import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";

const useAddLabelCard = ({ changeActiveCard }: LabelCardPropsType) => {
  const labels = useSelector((state: RootState) => state.allLabels.labels);

  const dispatch = useDispatch<AppDispatch>();

  const labelArray = useSelector(
    (state: RootState) => state.allLabels.labelArray
  );

  const newLabelArray = useSelector(
    (state: RootState) => state.allLabels.newLabelArray
  );

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const handleLabelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeActiveCard(NoteCardType.NOTE);
  };

  return {
    handleLabelSubmit,
    handleCancelClick,
    labels,
    labelArray,
    newLabelArray,
  };
};

export default useAddLabelCard;
