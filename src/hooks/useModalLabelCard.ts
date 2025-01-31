import { labelsApi } from "api/labelsApi";
import { useUpdateNote } from "contexts/hooks/useUpdateNote";
import { UpdateLabelType } from "labeltypes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import { addLabelToNote, deleteLabelFromNote } from "../redux/asyncThunks";
import { setUpdateLabelArray } from "../redux/labels/labelSlice";
import { updateUserNote } from "../redux/notes/noteSlice";

const useModalLabelCard = () => {
  const updateNoteContext = useUpdateNote();

  const dispatch = useDispatch<AppDispatch>();

  const labelsState = labelsApi.endpoints.getAllLabels.useQueryState(undefined);

  const labelArray = useSelector((state: RootState) => state.labels.labelArray);

  const handleBackClick = () => {
    updateNoteContext.changeActiveCard(NoteCardType.NOTE);
  };

  const handleCloseClick = () => {
    handleBackClick();
  };

  const handleExcludeLabelClick = (label: UpdateLabelType) => {
    dispatch(
      deleteLabelFromNote({
        noteId: updateNoteContext.noteData.id,
        labelId: label.id,
      })
    ).then(() => {
      dispatch(updateUserNote());
    });
  };

  const handleIncludeLabelClick = (label: UpdateLabelType) => {
    dispatch(
      addLabelToNote({
        noteId: updateNoteContext.noteData.id,
        labelId: label.id,
      })
    ).then(() => {
      dispatch(updateUserNote());
    });
  };

  useEffect(() => {
    dispatch(setUpdateLabelArray(updateNoteContext.noteData.labelSet));
  }, [dispatch, updateNoteContext.noteData.labelSet]);

  return {
    handleBackClick,
    handleCloseClick,
    labelArray,
    labelsState,
    handleExcludeLabelClick,
    handleIncludeLabelClick,
  };
};

export default useModalLabelCard;
