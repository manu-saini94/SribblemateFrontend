import { useMemo, useState } from "react";

export const useTakeNoteActive = () => {
  const [isTakeNoteActive, setIsTakeNoteActive] = useState<Boolean>(true);

  const toggleTakeNoteActive = () => {
    console.log("tog");

    setIsTakeNoteActive((prev) => !prev);
  };

  const takeNoteMemo = useMemo(
    () => ({
      isTakeNoteActive,
      toggleTakeNoteActive,
    }),
    [isTakeNoteActive]
  );

  return takeNoteMemo;
};
