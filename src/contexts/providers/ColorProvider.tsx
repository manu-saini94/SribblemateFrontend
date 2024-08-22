import ColorContext from "contexts/ColorContext";
import { ColorContextProps } from "global";
import React, { ReactNode, useMemo, useState } from "react";

const ColorProvider = ({ children }: ColorContextProps): ReactNode => {
  const [color, setColor] = useState<string>("#fff");

  const changeColorClick = (color: string) => {
    setColor((_prevValue) => color);
  };

  const colorContextValue = useMemo(
    () => ({
      color,
      changeColorClick,
    }),
    [color]
  );

  return (
    <ColorContext.Provider value={colorContextValue}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
