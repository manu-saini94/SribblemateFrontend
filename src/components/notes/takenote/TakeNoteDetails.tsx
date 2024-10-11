import useCardTypeActive from "hooks/useCardTypeActive";
import { TakeNoteDetailsType } from "notetypes";
import React from "react";
import { NoteCardType } from "utility/miscsUtils";
import CollaboratorCard from "./CollaboratorCard";
import LabelsCard from "./LabelsCard";
import TakeNoteDetailsCard from "./TakeNoteDetailsCard";

const TakeNoteDetails = ({ toggleTakeNoteActive }: TakeNoteDetailsType) => {
  const { activeCard, changeActiveCard } = useCardTypeActive();

  return (
    <>
      {NoteCardType.NOTE === activeCard && (
        <TakeNoteDetailsCard
          toggleTakeNoteActive={toggleTakeNoteActive}
          changeActiveCard={changeActiveCard}
        />
      )}
      {NoteCardType.COLLABORATOR === activeCard && (
        <CollaboratorCard changeActiveCard={changeActiveCard} />
      )}
      {NoteCardType.LABEL === activeCard && (
        <LabelsCard changeActiveCard={changeActiveCard} />
      )}
    </>
  );
};

export default TakeNoteDetails;
