import React from "react";
import { useSelector } from "react-redux";
import NoLabelledNotesIcon from "../components/icons/NoLabelledNotesIcon";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import withNote from "../components/notes/withNote";
import { selectLabelledNotes } from "../redux/selectors";

const AllLabelledNotes = () => {
  const labelledNotes = useSelector(selectLabelledNotes);

  return (
    <div className="container">
      {labelledNotes?.length > 0 ? (
        <DisplayNotes notes={labelledNotes} />
      ) : (
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
      <br />
    </div>
  );
};

export default withNote(AllLabelledNotes);
