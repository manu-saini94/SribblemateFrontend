import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useGetAllNotesQuery } from "api/notesApi";
import React, { useEffect, useMemo } from "react";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import withNote from "../components/notes/withNote";

const Notes = () => {
  const { data, error, isLoading, refetch } = useGetAllNotesQuery(undefined);
  useEffect(() => {
    console.log("Data=> ", data, "Err =>", error, "Loading => ", isLoading);
  }, [data, error, isLoading]);

  const { pinnedNotes, othersNotes } = useMemo(() => {
    if (!data) return { pinnedNotes: [], othersNotes: [] };

    return {
      pinnedNotes: data.filter((note) => note.pinned),
      othersNotes: data.filter(
        (note) => !note.pinned && !note.archived && !note.trashed
      ),
    };
  }, [data]);

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
