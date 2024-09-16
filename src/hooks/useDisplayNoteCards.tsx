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
    <div className=" row gx-3 gy-3 ">
      {notes.map((noteCard) => {
        return (
          <div className="col" key={noteCard.id}>
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
