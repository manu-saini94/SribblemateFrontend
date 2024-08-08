import NoteCard from "components/notes/NoteCard";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import TakeNote from "../components/notes/TakeNote";
import TakeNoteDetails from "../components/notes/TakeNoteDetails";

const Notes = () => {
  const [isTakeNoteActive, setIsTakeNoteActive] = useState<Boolean>(true);

  const notes = useSelector((state: RootState) => state.allNotes.notes);

  const onTakeNoteClick = () => {
    setIsTakeNoteActive(false);
  };

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex justify-content-center px-3 mx-auto mt-4 mb-3"
        style={{ width: "35rem" }}
      >
        {isTakeNoteActive ? (
          <div onClick={() => onTakeNoteClick()}>
            <TakeNote />
          </div>
        ) : (
          <TakeNoteDetails setIsTakeNoteActive={setIsTakeNoteActive} />
        )}
      </div>
      <div className="d-flex flex-row flex-wrap">
        {notes.map((noteCard) => {
          return <NoteCard key={noteCard.id} noteCardValues={noteCard} />;
        })}
      </div>
      <div className="d-flex flex-row flex-wrap d-none">Flex item 4</div>
    </div>
  );
};

export default Notes;
