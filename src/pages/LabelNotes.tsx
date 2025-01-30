import { notesApi } from "api/notesApi";
import NoLabelledNotesIcon from "components/icons/NoLabelledNotesIcon";
import DisplayNotes from "components/notes/shownotes/DisplayNotes";
import { AllCategoriesNotesType, UpdateNoteType } from "notetypes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategorizedNotes } from "utility/reduxutils/noteUtils";

const LabelNotes = () => {
  const { labelId } = useParams<{ labelId?: string }>();
  const [labelNotes, setLabelNotes] = useState<UpdateNoteType[]>();
  const [noteIds, setNoteIds] = useState<number[]>();

  const [categorizedNotes, setCategorizedNotes] =
    useState<AllCategoriesNotesType>();
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
    if (labelNotes && labelNotes.length > 0) {
      setCategorizedNotes(getCategorizedNotes(labelNotes));
    }
  }, [labelNotes]);

  useEffect(() => {
    if (notesCache && noteIds && noteIds.length > 0) {
      const notes = noteIds
        .map((id) => notesCache?.notesById[id])
        .filter((note) => note !== undefined);
      setLabelNotes(notes);
    }
  }, [noteIds, notesCache]);

  useEffect(() => {
    if (notesByLabelsCache && labelId)
      setNoteIds(notesByLabelsCache[Number(labelId)]);
  }, [labelId, notesByLabelsCache]);

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
              No notes with this label yet
            </span>
          </div>
        )}
    </div>
  );
};

export default LabelNotes;
