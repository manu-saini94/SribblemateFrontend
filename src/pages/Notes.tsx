import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import React from "react";
import { useSelector } from "react-redux";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import withNote from "../components/notes/withNote";
import { selectOthersNotes, selectPinnedNotes } from "../redux/selectors";

const Notes = () => {
  const pinnedNotes = useSelector(selectPinnedNotes);
  const othersNotes = useSelector(selectOthersNotes);

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
      {pinnedNotes?.length === 0 && othersNotes?.length === 0 && (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <EditNoteOutlinedIcon
            className=""
            style={{ fontSize: "100px", color: "lightgray" }}
          />
          <span style={{ fontSize: "25px", color: "lightgray" }}>
            You have no notes yet.
          </span>
          <span style={{ fontSize: "25px", color: "lightgray" }}>
            Start creating some!
          </span>
        </div>
      )}
    </div>
  );
};

export default withNote(Notes);
