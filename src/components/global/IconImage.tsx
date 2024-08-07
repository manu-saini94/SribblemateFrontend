import { IconImageType } from "global";
import React from "react";

const IconImage = ({ x, y, src }: IconImageType) => {
  return <img className={`px-${x} py-${y} pointer z-2`} src={src} alt={src} />;
};

export default IconImage;
