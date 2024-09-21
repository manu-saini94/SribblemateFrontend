import NoteCard from "components/notes/NoteCard";
import { UpdateNoteType } from "notetypes";
import React, { useCallback, useState } from "react";

const useDisplayNoteCards = (notes: UpdateNoteType[]) => {
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
    <div className="d-flex flex-wrap justify-content-center">
      {notes.map((noteCard) => {
        return (
          <div className="p-2 g-col-2" key={noteCard.id}>
            <NoteCard
              key={noteCard.id}
              noteCardValues={noteCard}
              onNoteClick={handleClick(noteCard)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default useDisplayNoteCards;
