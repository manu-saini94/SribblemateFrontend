import { ColorContextType } from "global";
import { createContext } from "react";

const defaultColorContext: ColorContextType = {
  color: "#fff",
  changeColorClick: () => {},
};

const ColorContext = createContext<ColorContextType>(defaultColorContext);

export default ColorContext;
