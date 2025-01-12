import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import { extractFromNotesByLabelId } from "../redux/notes/noteSlice";

const Labels = () => {
  // const [labelNotes] = useAllLabelNotes();
  const { labelId } = useParams<{ labelId?: string }>();
  const currentLabelNotes = useSelector(
    (state: RootState) => state.allNotes.currentLabelNotes
  );

  const dispatch = useDispatch<AppDispatch>();

  const getLabeledNotes = useCallback(() => {
    if (labelId) {
      const numberedLabelId = Number(labelId);

      dispatch(extractFromNotesByLabelId(numberedLabelId));
    }
  }, [labelId, dispatch]);

  useEffect(() => {
    getLabeledNotes();
  }, [getLabeledNotes]);

  return <DisplayNotes notes={currentLabelNotes} />;
};

export default Labels;
