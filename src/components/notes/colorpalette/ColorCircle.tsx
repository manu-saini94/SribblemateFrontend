import { useColor } from "hooks/useColor";
import { ColorCircleProps } from "notetypes";
import React from "react";

const ColorCircle = (props: ColorCircleProps) => {
  const { colorSelectClass, colorItem } = props;
  const colorContext = useColor();
  const onColorClick = (color: string, event: React.MouseEvent) => {
    event.stopPropagation();
    colorContext.changeColorClick(color);
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
