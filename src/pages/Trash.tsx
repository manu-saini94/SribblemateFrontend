import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";
import { useSelector } from "react-redux";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import { selectTrashedNotes } from "../redux/selectors";

const Trash = () => {
  const trashNotes = useSelector(selectTrashedNotes);

  return (
    <div className="container">
      {trashNotes?.length > 0 ? (
        <DisplayNotes notes={trashNotes} />
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <DeleteOutlinedIcon
            className=""
            style={{ fontSize: "100px", color: "lightgray" }}
          />
          <span style={{ fontSize: "25px", color: "lightgray" }}>
            No notes in Trash
          </span>
        </div>
      )}
      <br />
    </div>
  );
};

export default Trash;
