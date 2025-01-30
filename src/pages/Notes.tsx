import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { notesApi } from "api/notesApi";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { getOthersNotes, getPinnedNotes } from "utility/reduxutils/noteUtils";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import withNote from "../components/notes/withNote";
import { setLoaderState } from "../redux/global/globalSlice";

const Notes = () => {
  const {
    data: notesCache,
    isLoading,
    isSuccess,
    isError,
  } = notesApi.endpoints.getAllNotes.useQueryState(undefined);

  const dispatch = useDispatch<AppDispatch>();

  const { pinnedNotes } = notesApi.endpoints.getAllNotes.useQueryState(
    undefined,
    {
      selectFromResult: ({ data }) => {
        return {
          pinnedNotes: data && getPinnedNotes(data.notes),
        };
      },
    }
  );

  const { othersNotes } = notesApi.endpoints.getAllNotes.useQueryState(
    undefined,
    {
      selectFromResult: ({ data }) => {
        return {
          othersNotes: data && getOthersNotes(data.notes),
        };
      },
    }
  );

  useEffect(() => {
    dispatch(setLoaderState(isLoading));
  }, [notesCache, dispatch, isLoading]);

  return (
    <div className="container-fluid">
      {pinnedNotes && pinnedNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">PINNED</h6>
          <DisplayNotes notes={pinnedNotes} />
        </>
      )}
      <br />
      {othersNotes && othersNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">OTHERS</h6>
          <DisplayNotes notes={othersNotes} />
        </>
      )}
      {pinnedNotes &&
        pinnedNotes?.length === 0 &&
        othersNotes &&
        othersNotes?.length === 0 && (
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
