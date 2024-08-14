import ThemeContext from "contexts/ThemeContext";
import { ThemeContextType } from "global";
import { useContext } from "react";

export const useTheme = () => useContext<ThemeContextType>(ThemeContext);
