import React from "react";

const IconImage = (props) => {
  const { x, y, src } = props;
  return (
    <img
      className={`px-${x} py-${y} pointer z-2`}
      src={src}
      alt={src}
      {...props}
    />
  );
};

export default IconImage;
