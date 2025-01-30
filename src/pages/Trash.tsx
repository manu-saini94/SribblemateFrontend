import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { notesApi } from "api/notesApi";
import React from "react";
import { getTrashedNotes } from "utility/reduxutils/noteUtils";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";

const Trash = () => {
  const { trashNotes } = notesApi.endpoints.getAllNotes.useQueryState(
    undefined,
    {
      selectFromResult: ({ data }) => {
        return {
          trashNotes: data && getTrashedNotes(data.notes),
        };
      },
    }
  );

  return (
    <div className="container">
      {trashNotes && trashNotes?.length > 0 ? (
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
