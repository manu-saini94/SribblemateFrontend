import TakeNoteContext from "contexts/TakeNoteContext";
import { TakeNoteContextProps } from "notetypes";
import React, { ReactNode, useMemo, useState } from "react";

const TakeNoteProvider = ({ children }: TakeNoteContextProps): ReactNode => {
  const [isTakeNoteActive, setIsTakeNoteActive] = useState<Boolean>(false);

  const takeNoteContextValue = useMemo(
    () => ({
      isTakeNoteActive,
      setIsTakeNoteActive,
    }),
    [isTakeNoteActive]
  );

  return (
    <TakeNoteContext.Provider value={takeNoteContextValue}>
      {children}
    </TakeNoteContext.Provider>
  );
};

export default TakeNoteProvider;
