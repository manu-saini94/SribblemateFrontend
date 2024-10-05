import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import { fetchAllLabelNotes, fetchNotesByLabel } from "../redux/asyncThunks";
import { extractFromNotesByLabelId } from "../redux/notes/noteSlice";

const Label = () => {
  // const [labelNotes] = useAllLabelNotes();
  const { labelId } = useParams<{ labelId?: string }>();
  const currentLabelNotes = useSelector(
    (state: RootState) => state.allNotes.currentLabelNotes
  );
  const allLabelNotes = useSelector(
    (state: RootState) => state.allNotes.allLabelNotes
  );

  const allNotesByLabelId = useSelector(
    (state: RootState) => state.allNotes.notesByLabelId
  );

  const dispatch = useDispatch<AppDispatch>();

  const getLabeledNotes = useCallback(() => {
    if (labelId) {
      const numberedLabelId = Number(labelId);
      if (!allNotesByLabelId[numberedLabelId]) {
        dispatch(fetchNotesByLabel(numberedLabelId)).then(() =>
          dispatch(extractFromNotesByLabelId(numberedLabelId))
        );
      } else {
        dispatch(extractFromNotesByLabelId(numberedLabelId));
      }
    } else if (allLabelNotes.length === 0) {
      dispatch(fetchAllLabelNotes());
    }
  }, [labelId, dispatch, allLabelNotes, allNotesByLabelId]);

  useEffect(() => {
    getLabeledNotes();
  }, [getLabeledNotes]);

  return <DisplayNotes notes={labelId ? currentLabelNotes : allLabelNotes} />;
};

export default Label;
