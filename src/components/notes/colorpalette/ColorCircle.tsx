import { useCreateNote } from "hooks/useCreateNote";
import { ColorCircleProps } from "notetypes";
import React from "react";

const ColorCircle = (props: ColorCircleProps) => {
  const { colorSelectClass, colorItem } = props;
  const createNoteContext = useCreateNote();
  const onColorClick = (color: string, event: React.MouseEvent) => {
    createNoteContext.changeColorClick(color);
  };
  return (
    <div key={colorItem} className="px-1">
      <button
        className={`button ${colorSelectClass} mx-1`}
        style={{ backgroundColor: `${colorItem}` }}
        onClick={(event) => onColorClick(colorItem, event)}
        type="button"
      ></button>
    </div>
  );
};

export default ColorCircle;
