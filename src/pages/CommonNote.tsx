import TakeNote from "components/notes/TakeNote";
import TakeNoteDetails from "components/notes/TakeNoteDetails";
import useTakeNoteActive from "hooks/useTakeNoteActive";
import { CommonNoteProps } from "notetypes";
import React, { ReactNode } from "react";

const CommonNote = ({ children }: CommonNoteProps): ReactNode => {
  const [isTakeNoteActive, setIsTakeNoteActive, onTakeNoteClick] =
    useTakeNoteActive();

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex justify-content-center px-3 mx-auto mt-4 mb-3"
        style={{ width: "35rem" }}
      >
        {isTakeNoteActive ? (
          <div onClick={() => onTakeNoteClick()}>
            <TakeNote />
          </div>
        ) : (
          <TakeNoteDetails setIsTakeNoteActive={setIsTakeNoteActive} />
        )}
      </div>
      <div className="d-flex flex-row flex-wrap">{children}</div>
      <div className="d-flex flex-row flex-wrap d-none">Flex item 4</div>
    </div>
  );
};

export default CommonNote;
