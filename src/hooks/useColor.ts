import { useState } from "react";

const useColor = () => {
  const [isOpenColorTooltip, setIsOpenColorTooltip] = useState(false);

  const handleColorTooltipClose = () => {
    setIsOpenColorTooltip(false);
  };

  const handleColorTooltipOpen = () => {
    setIsOpenColorTooltip(true);
  };

  return {
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  };
};

export default useColor;
