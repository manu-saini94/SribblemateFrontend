import { useUpdateNote } from "contexts/hooks/useUpdateNote";
import React from "react";
import { NoteCardType } from "utility/miscsUtils";
import CollaboratorUpdateCard from "../updatenote/CollaboratorUpdateCard";
import LabelUpdateCard from "../updatenote/LabelUpdateCard";
import NoteUpdateCard from "../updatenote/NoteUpdateCard";

const ModalNoteCard = () => {
  const updateNoteContext = useUpdateNote();
  return (
    <>
      {NoteCardType.NOTE === updateNoteContext?.activeCard && (
        <NoteUpdateCard />
      )}
      {NoteCardType.COLLABORATOR === updateNoteContext?.activeCard && (
        <CollaboratorUpdateCard />
      )}
      {NoteCardType.LABEL === updateNoteContext?.activeCard && (
        <LabelUpdateCard />
      )}
    </>
  );
};

export default ModalNoteCard;
