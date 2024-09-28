import TakeNote from "components/notes/TakeNote";
import TakeNoteDetails from "components/notes/TakeNoteDetails";
import ColorProvider from "contexts/providers/ColorProvider";
import { useTakeNoteActive } from "hooks/useTakeNoteActive";

import { CommonNoteProps } from "notetypes";
import React, { ReactNode } from "react";

const CommonNote = ({ children }: CommonNoteProps): ReactNode => {
  const { isTakeNoteActive, toggleTakeNoteActive } = useTakeNoteActive();

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex justify-content-center px-3 mx-auto mt-4 mb-3"
        style={{ width: "35rem" }}
      >
        {isTakeNoteActive ? (
          <TakeNote onTakeNoteClick={() => toggleTakeNoteActive()} />
        ) : (
          <ColorProvider>
            <TakeNoteDetails toggleTakeNoteActive={toggleTakeNoteActive} />
          </ColorProvider>
        )}
      </div>
      <div className="d-flex">{children}</div>
    </div>
  );
};

export default CommonNote;
