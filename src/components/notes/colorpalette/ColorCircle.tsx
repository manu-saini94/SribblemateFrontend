import React from "react";

const ColorCircle = (props) => {
  const { colorSelectClass, colorItem, onColorClick } = props;
  return (
    <div key={colorItem} className="px-1">
      <button
        className={`button ${colorSelectClass} mx-1`}
        style={{ backgroundColor: `${colorItem}` }}
        onClick={() => onColorClick(colorItem)}
      ></button>
    </div>
  );
};

export default ColorCircle;
