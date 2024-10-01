import DisplayNotes from "components/notes/DisplayNotes";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import withNote from "../components/notes/withNote";

const Notes = () => {
  const notes = useSelector(
    (state: RootState) => state.notes.pinnedAndOthersNotes
  );
  return <DisplayNotes notes={notes} />;
};

export default withNote(Notes);
