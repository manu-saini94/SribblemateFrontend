import NoteCard from "components/notes/NoteCard";
import { UpdateNoteType } from "notetypes";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const Notes = () => {
  const notes = useSelector((state: RootState) => state.allNotes.notes);
  const [isUpdateCardActive, setIsUpdateCardActive] = useState<Boolean>(false);

  const handleNoteCardClick = (event: {
    target: { value: UpdateNoteType };
  }) => {
    const noteCard: UpdateNoteType = event.target.value;
  };

  return (
    <>
      {notes.map((noteCard) => {
        return (
          <NoteCard
            key={noteCard.id}
            noteCardValues={noteCard}
            onClick={() => handleNoteCardClick}
          />
        );
      })}
    </>
  );
};

export default Notes;
