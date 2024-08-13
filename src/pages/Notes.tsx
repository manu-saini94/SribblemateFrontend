import NoteCard from "components/notes/NoteCard";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const Notes = () => {
  const notes = useSelector((state: RootState) => state.allNotes.notes);

  return (
    <>
      {notes.map((noteCard) => {
        return (
          <NoteCard
            key={noteCard.id}
            noteCardValues={noteCard}
            setIsTakeNoteActive={setIsTakeNoteActive}
          />
        );
      })}
    </>
  );
};

export default Notes;
