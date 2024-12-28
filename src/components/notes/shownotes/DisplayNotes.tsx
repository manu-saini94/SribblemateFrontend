import NoteCard from "components/notes/shownotes/NoteCard";
import UpdateNoteProvider from "contexts/providers/UpdateNoteProvider";
import { NotesPropsType } from "notetypes";
import React from "react";
import useDisplayNoteCards from "../../../hooks/useDisplayNoteCards";

const DisplayNotes = ({ notes }: NotesPropsType) => {
  const { isUpdateCardActive, currentNoteCard, handleClick } =
    useDisplayNoteCards();

  return (
    <div className="d-flex flex-wrap ">
      {notes?.map((noteCard) => {
        return (
          <div className="p-2 g-col-2" key={noteCard.id}>
            <UpdateNoteProvider noteCardValues={noteCard}>
              <NoteCard key={noteCard.id} />
            </UpdateNoteProvider>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayNotes;
