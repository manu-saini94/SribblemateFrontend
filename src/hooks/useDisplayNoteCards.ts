import { UpdateNoteType } from "notetypes";
import { useCallback, useState } from "react";

const useDisplayNoteCards = () => {
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

  return {
    isUpdateCardActive,
    currentNoteCard,
    handleNoteCardClick,
    handleClick,
  };
};

export default useDisplayNoteCards;
