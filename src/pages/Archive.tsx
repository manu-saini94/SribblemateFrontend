import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import React from "react";
import { useSelector } from "react-redux";
import DisplayNotes from "../components/notes/DisplayNotes";
import withNote from "../components/notes/withNote";
import { selectArchivedNotes } from "../redux/selectors";

const Archive = () => {
  const archiveNotes = useSelector(selectArchivedNotes);

  return (
    <div className="container">
      {archiveNotes?.length > 0 ? (
        <DisplayNotes notes={archiveNotes} />
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <ArchiveOutlinedIcon
            className=""
            style={{ fontSize: "100px", color: "lightgray" }}
          />
          <span style={{ fontSize: "25px", color: "lightgray" }}>
            Archived notes appear here
          </span>
        </div>
      )}
      <br />
    </div>
  );
};

export default withNote(Archive);
