import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { colorList } from "utility/miscsUtils";
import { changeColor } from "../../../redux/notes/color/colorSlice";
import ColorCircle from "./ColorCircle";

const ColorPalette = () => {
  const color = useSelector((state: RootState) => state.noteColor.color);

  const dispatch = useDispatch();

  const onColorClick = (colorItem: string) => {
    dispatch(changeColor(colorItem));
  };

  return (
    <div
      className="card position-absolute start-0 mt-1 "
      style={{ height: "auto", width: "auto", zIndex: 2 }}
    >
      <div className="card-body align-items-center">
        <div className="d-flex flex-row mx-1 px-1">
          {colorList.map((colorItem) => {
            return (
              <ColorCircle
                key={colorItem}
                onColorClick={onColorClick}
                colorSelectClass={color === colorItem ? "button-click" : ""}
                colorItem={colorItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
