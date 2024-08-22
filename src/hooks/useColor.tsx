import ColorContext from "contexts/ColorContext";
import { ColorContextType } from "global";
import { useContext } from "react";

export const useColor = () => useContext<ColorContextType>(ColorContext);
