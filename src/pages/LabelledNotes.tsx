import { notesApi } from "api/notesApi";
import NoLabelledNotesIcon from "components/icons/NoLabelledNotesIcon";
import DisplayNotes from "components/notes/shownotes/DisplayNotes";
import { AllCategoriesNotesType, UpdateNoteType } from "notetypes";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { getCategorizedNotes } from "utility/reduxutils/noteUtils";
import withNote from "../components/notes/withNote";
import { setLoaderState } from "../redux/global/globalSlice";

const LabelledNotes = () => {
  const [noteIds, setNoteIds] = useState<number[]>();
  const [labelledNotes, setLabelledNotes] = useState<UpdateNoteType[]>();
  const [categorizedNotes, setCategorizedNotes] =
    useState<AllCategoriesNotesType>();

  const dispatch = useDispatch<AppDispatch>();
  const {
    data: notesCache,
    isLoading: notesCacheLoading,
    isSuccess: notesCacheSuccess,
    isError: notesCacheError,
  } = notesApi.endpoints.getAllNotes.useQueryState(undefined);
  const {
    data: notesByLabelsCache,
    isLoading: notesByLabelsLoading,
    isSuccess: notesByLabelsSuccess,
    isError: notesByLabelsError,
  } = notesApi.endpoints.fetchNotesByLabels.useQueryState(undefined);

  useEffect(() => {
    if (labelledNotes && labelledNotes.length > 0) {
      setCategorizedNotes(getCategorizedNotes(labelledNotes));
    } else {
      setCategorizedNotes(getCategorizedNotes([]));
    }
    return () => setCategorizedNotes(getCategorizedNotes([]));
  }, [labelledNotes]);

  useEffect(() => {
    if (notesCache && noteIds && noteIds.length > 0) {
      const notes = noteIds
        .map((id) => notesCache?.notesById[id])
        .filter((note) => note !== undefined);
      setLabelledNotes(notes);
    }
    return () => setLabelledNotes([]);
  }, [noteIds, notesCache]);

  useEffect(() => {
    if (notesByLabelsCache) setNoteIds(notesByLabelsCache[0]);
    return () => setNoteIds([]);
  }, [notesByLabelsCache]);

  useEffect(() => {
    dispatch(setLoaderState(notesCacheLoading || notesByLabelsLoading));
  }, [dispatch, notesByLabelsLoading, notesCacheLoading]);

  return (
    <div className="container-fluid">
      {categorizedNotes && categorizedNotes.pinnedNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">PINNED</h6>
          <DisplayNotes notes={categorizedNotes.pinnedNotes} />
        </>
      )}
      <br />
      {categorizedNotes && categorizedNotes.othersNotes?.length > 0 && (
        <>
          <h6 className="pin-heading">OTHERS</h6>
          <DisplayNotes notes={categorizedNotes.othersNotes} />
        </>
      )}
      <br />
      {categorizedNotes &&
        categorizedNotes.archivedNotes &&
        categorizedNotes.archivedNotes?.length > 0 && (
          <>
            <h6 className="pin-heading">ARCHIVE</h6>
            <DisplayNotes notes={categorizedNotes.archivedNotes} />
          </>
        )}
      {categorizedNotes &&
        categorizedNotes.pinnedNotes?.length === 0 &&
        categorizedNotes.othersNotes?.length === 0 &&
        categorizedNotes.archivedNotes?.length === 0 && (
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

export default withNote(LabelledNotes);
