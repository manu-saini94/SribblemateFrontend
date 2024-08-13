import { useState } from "react";

const useTakeNoteActive = (): [
  Boolean,
  React.Dispatch<React.SetStateAction<Boolean>>,
  () => void
] => {
  const [isTakeNoteActive, setIsTakeNoteActive] = useState<Boolean>(true);

  const onTakeNoteClick = () => {
    setIsTakeNoteActive(false);
  };

  return [isTakeNoteActive, setIsTakeNoteActive, onTakeNoteClick];
};

export default useTakeNoteActive;
