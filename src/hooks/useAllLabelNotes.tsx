import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";

import { fetchAllLabelNotes, fetchNotesByLabel } from "redux/asyncThunks";
import { extractFromNotesByLabelId } from "../redux/notes/noteSlice";

const useAllLabelNotes = () => {
  const { labelId } = useParams<{ labelId?: string }>();
  const currentLabelNotes = useSelector(
    (state: RootState) => state.notes.currentLabelNotes
  );
  const allLabelNotes = useSelector(
    (state: RootState) => state.notes.allLabelNotes
  );

  const allNotesByLabelId = useSelector(
    (state: RootState) => state.notes.notesByLabelId
  );

  const dispatch = useDispatch<AppDispatch>();

  const getLabeledNotes = useCallback(() => {
    if (labelId) {
      const numberedLabelId = Number(labelId);
      if (!allNotesByLabelId[numberedLabelId]) {
        dispatch(fetchNotesByLabel(numberedLabelId)).then(() =>
          extractFromNotesByLabelId(numberedLabelId)
        );
      } else {
        dispatch(extractFromNotesByLabelId(numberedLabelId));
      }
    } else if (allLabelNotes.length === 0) {
      dispatch(fetchAllLabelNotes());
    }
  }, [labelId, dispatch, allLabelNotes, currentLabelNotes]);

  useEffect(() => {
    getLabeledNotes();
  }, [getLabeledNotes]);

  return labelId ? [currentLabelNotes] : [allLabelNotes];
};

export default useAllLabelNotes;
