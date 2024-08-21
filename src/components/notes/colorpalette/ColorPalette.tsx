import { useColor } from "hooks/useColor";
import React from "react";
import { colorList } from "utility/miscsUtils";
import ColorCircle from "./ColorCircle";

const ColorPalette = () => {
  const colorContext = useColor();

  return (
    <div className="d-flex flex-row mx-1 px-1">
      {colorList.map((colorItem) => {
        return (
          <ColorCircle
            key={colorItem}
            colorSelectClass={
              colorContext.color === colorItem ? "button-click" : ""
            }
            colorItem={colorItem}
          />
        );
      })}
    </div>
  );
};

export default ColorPalette;
