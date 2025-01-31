import TakeNote from "components/notes/takenote/TakeNote";
import TakeNoteDetails from "components/notes/takenote/TakeNoteDetails";
import CreateNoteProvider from "contexts/providers/CreateNoteProvider";
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
          <CreateNoteProvider>
            <TakeNoteDetails toggleTakeNoteActive={toggleTakeNoteActive} />
          </CreateNoteProvider>
        )}
      </div>
      <div className="d-flex">{children}</div>
    </div>
  );
};

export default CommonNote;
