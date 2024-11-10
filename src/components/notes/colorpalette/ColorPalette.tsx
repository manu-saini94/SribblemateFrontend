import { useCreateNote } from "hooks/useCreateNote";
import React from "react";
import { colorList } from "utility/miscsUtils";
import ColorCircle from "./ColorCircle";

const ColorPalette = () => {
  const createNoteContext = useCreateNote();

  return (
    <div className="d-flex flex-row flex-wrap">
      {colorList.map((colorItem) => {
        return (
          <div className="mx-1">
            <ColorCircle
              key={colorItem}
              colorSelectClass={
                createNoteContext.noteData?.color === colorItem
                  ? "button-click"
                  : ""
              }
              colorItem={colorItem}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColorPalette;
