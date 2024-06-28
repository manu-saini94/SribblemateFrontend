import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../redux/notes/noteSlice";
import TakeNote from "./TakeNote";
import TakeNoteDetails from "./TakeNoteDetails";

const Notes = () => {
  const [isTakeNoteActive, setIsTakeNoteActive] = useState(true);
  const notes = useSelector((state) => state.allNotes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  });

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
        {notes.map((note) => {
          return <div className="p-2">{note.userName}</div>;
        })}
      </div>
      <div className="d-flex flex-row flex-wrap d-none">Flex item 4</div>
    </div>
  );
};

export default Notes;
