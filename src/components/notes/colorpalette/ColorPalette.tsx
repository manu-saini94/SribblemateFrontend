import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../../../redux/notes/color/colorSlice";
import ColorCircle from "./ColorCircle";

const colorList = [
  "#fff",
  "#faafa8",
  "#f39f76",
  "#fff8b8",
  "#e2f6d3",
  "#b4ddd3",
  "#d4e4ed",
  "#aeccdc",
  "#d3bfdb",
  "#f6e2dd",
  "#e9e3d4",
  "#efeff1",
];

const ColorPalette = () => {
  const color = useSelector((state) => state.noteColor.color);

  const dispatch = useDispatch();

  const onColorClick = (colorItem) => {
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
