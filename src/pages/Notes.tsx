import NoteCard from "components/notes/NoteCard";
import { UpdateNoteType } from "notetypes";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import withNote from "./withNote";

const Notes = () => {
  const notes = useSelector(
    (state: RootState) => state.notes.pinnedAndOthersNotes
  );
  const [isUpdateCardActive, setIsUpdateCardActive] = useState<Boolean>(false);
  const [currentNoteCard, setCurrentNoteCard] = useState<UpdateNoteType>(
    {} as UpdateNoteType
  );

  const handleNoteCardClick = (noteCard: UpdateNoteType) => {
    setCurrentNoteCard(noteCard);
    setIsUpdateCardActive(true);
  };

  const handleClick = useCallback(
    (noteCard: UpdateNoteType) => () => {
      handleNoteCardClick(noteCard);
    },
    []
  );

  return (
    <>
      {notes.map((noteCard) => {
        return (
          <NoteCard
            key={noteCard.id}
            noteCardValues={noteCard}
            onNoteClick={handleClick(noteCard)}
          />
        );
      })}
      {isUpdateCardActive && <>hi</>}
    </>
  );
};

export default withNote(Notes);
