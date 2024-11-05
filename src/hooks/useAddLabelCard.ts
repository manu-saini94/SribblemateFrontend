import { CreateLabelType } from "labeltypes";
import { LabelCardPropsType } from "notetypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import {
  deleteLabelInNote,
  insertNewLabelInNote,
} from "../redux/labels/labelSlice";

const useAddLabelCard = ({ changeActiveCard }: LabelCardPropsType) => {
  const labels = useSelector((state: RootState) => state.allLabels.labels);

  const dispatch = useDispatch<AppDispatch>();

  const labelArray = useSelector(
    (state: RootState) => state.allLabels.labelArray
  );

  const newLabelArray = useSelector(
    (state: RootState) => state.allLabels.newLabelArray
  );

  const handleExcludeLabelClick = (label: CreateLabelType) => {
    dispatch(deleteLabelInNote(label.labelName));
  };

  const handleIncludeLabelClick = (label: CreateLabelType) => {
    dispatch(insertNewLabelInNote(label));
  };

  const handleCloseClick = () => {
    changeActiveCard(NoteCardType.NOTE);
  };

  return {
    handleCloseClick,
    labels,
    labelArray,
    newLabelArray,
    handleIncludeLabelClick,
    handleExcludeLabelClick,
  };
};

export default useAddLabelCard;
