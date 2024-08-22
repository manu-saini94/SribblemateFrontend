import { IconImageType } from "global";
import React from "react";
import "../../Button.scss";

const IconImage = ({ x, y, src, onClick }: IconImageType) => {
  return (
    <img
      className={`px-${x} py-${y} pointer z-2`}
      src={src}
      alt={src}
      onClick={onClick}
    />
  );
};

export default IconImage;
