import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NoLabelledNotesIcon from "../components/icons/NoLabelledNotesIcon";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import withNote from "../components/notes/withNote";
import { selectLabelledNotes } from "../redux/selectors";

const LabelNotes = () => {
  const { pinnedNotes, archivedNotes, othersNotes } =
    useSelector(selectLabelledNotes);

  useEffect(() => {
    console.log("P->", pinnedNotes);
    console.log("A->", archivedNotes);
    console.log("O->", othersNotes);
  }, [archivedNotes, othersNotes, pinnedNotes]);

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
              All labelled notes appear here
            </span>
          </div>
        )}
    </div>
  );
};

export default withNote(LabelNotes);
