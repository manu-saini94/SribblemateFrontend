import { useMemo, useState } from "react";
import { NoteCardType } from "../utility/miscsUtils";

const useCardTypeActive = () => {
  const [activeCard, setActiveCard] = useState<NoteCardType>(NoteCardType.NOTE);

  const changeActiveCard = (cardType: NoteCardType) => {
    setActiveCard(cardType);
  };

  const cardTypeMemo = useMemo(
    () => ({
      activeCard,
      changeActiveCard,
    }),
    [activeCard]
  );

  return cardTypeMemo;
};

export default useCardTypeActive;
