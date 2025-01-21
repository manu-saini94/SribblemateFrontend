import NoteSkeletonLoader from "components/notes/loaders/NoteSkeletonLoader";
import useNotesByLabelId from "hooks/useNotesByLabelId";
import React from "react";
import { useParams } from "react-router-dom";
import NoLabelledNotesIcon from "../components/icons/NoLabelledNotesIcon";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";

const LabelNotes = () => {
  const { labelId } = useParams<{ labelId?: string }>();

  const {
    notes: { pinnedNotes, archivedNotes, othersNotes },
    isLoading,
    error,
  } = useNotesByLabelId(Number(labelId));

  return (
    <div className="container-fluid">
      {isLoading ? (
        <NoteSkeletonLoader />
      ) : (
        pinnedNotes?.length > 0 && (
          <>
            <h6 className="pin-heading">PINNED</h6>
            <DisplayNotes notes={pinnedNotes} />
          </>
        )
      )}
      <br />
      {othersNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">OTHERS</h6>
          <DisplayNotes notes={othersNotes} />
        </>
      )}
      <br />
      {archivedNotes && archivedNotes.length > 0 && (
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
