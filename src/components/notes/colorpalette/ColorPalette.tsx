import { ColorPaletteProps } from "notetypes";
import React from "react";
import { colorList } from "utility/miscsUtils";
import ColorCircle from "./ColorCircle";

const ColorPalette = (props: ColorPaletteProps) => {
  const { color, onChangeColor } = props;
  return (
    <div className="d-flex flex-row flex-wrap">
      {colorList.map((colorItem) => {
        return (
          <div key={colorItem} className="mx-1">
            <ColorCircle
              key={colorItem}
              colorSelectClass={color === colorItem ? "button-click" : ""}
              onChangeColor={onChangeColor}
              colorItem={colorItem}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColorPalette;
