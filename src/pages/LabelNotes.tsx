import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "redux/store";
import NoLabelledNotesIcon from "../components/icons/NoLabelledNotesIcon";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import { extractFromNotesByLabelId } from "../redux/notes/noteSlice";
import { selectNotesByLabelId } from "../redux/selectors";

const LabelNotes = () => {
  const { labelId } = useParams<{ labelId?: string }>();
  const { pinnedNotes, archivedNotes, othersNotes } =
    useSelector(selectNotesByLabelId);

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

  return (
    <div className="container-fluid">
      {pinnedNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">PINNED</h6>
          <DisplayNotes notes={pinnedNotes} />
        </>
      )}
      <br />
      {othersNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">OTHERS</h6>
          <DisplayNotes notes={othersNotes} />
        </>
      )}
      <br />
      {archivedNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">ARCHIVE</h6>
          <DisplayNotes notes={archivedNotes} />
        </>
      )}
      {pinnedNotes?.length === 0 &&
        othersNotes?.length === 0 &&
        archivedNotes?.length === 0 && (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <NoLabelledNotesIcon />
            <span style={{ fontSize: "25px", color: "lightgray" }}>
              No notes with this label yet
            </span>
          </div>
        )}
    </div>
  );
};

export default LabelNotes;
