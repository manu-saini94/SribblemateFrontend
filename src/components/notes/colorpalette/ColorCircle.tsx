import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCreateNote } from "hooks/useCreateNote";
import { ColorCircleProps } from "notetypes";
import React, { useState } from "react";

const ColorCircle = (props: ColorCircleProps) => {
  const { colorSelectClass, colorItem } = props;
  const [isOverColor, setIsOverColor] = useState<Boolean>(false);
  const createNoteContext = useCreateNote();
  const onColorClick = (color: string, event: React.MouseEvent) => {
    createNoteContext.changeColorClick(color);
  };

  const handleColorHover = () => {
    setIsOverColor(true);
  };
  const handleColorExit = () => {
    setIsOverColor(false);
  };

  return (
    <div key={colorItem} className="">
      <button
        className={`button ${colorSelectClass} mx-1`}
        onMouseEnter={handleColorHover}
        onMouseLeave={handleColorExit}
        style={{
          backgroundColor: `${colorItem}`,
          border:
            !isOverColor && colorSelectClass !== "button-click"
              ? `1px solid #D3D3D3`
              : isOverColor && colorSelectClass !== "button-click"
              ? `1px solid black`
              : "",
          position: "relative",
          zIndex: 2,
        }}
        onClick={(event) => onColorClick(colorItem, event)}
        type="button"
      >
        {colorSelectClass === "button-click" && (
          <CheckCircleIcon
            style={{
              position: "absolute",
              top: "-35%", // Adjust based on your preferred position
              right: "-35%", // Adjust based on your preferred position
              fontSize: "14px", // Adjust size if necessary
              color: "magenta", // Adjust icon color based on your preference
              zIndex: 1,
            }}
          />
        )}
      </button>
    </div>
  );
};

export default ColorCircle;
