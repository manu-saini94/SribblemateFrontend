import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { notesApi } from "api/notesApi";
import React from "react";
import { getArchivedNotes } from "utility/reduxutils/noteUtils";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";

const Archive = () => {
  const { archiveNotes } = notesApi.endpoints.getAllNotes.useQueryState(
    undefined,
    {
      selectFromResult: ({ data }) => {
        return {
          archiveNotes: data && getArchivedNotes(data.notes),
        };
      },
    }
  );

  return (
    <div className="container">
      {archiveNotes && archiveNotes?.length > 0 ? (
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

export default Archive;
