import { ThemeContextType } from "global";
import { createContext } from "react";

const defaultThemeContext: ThemeContextType = {
  isDarkMode: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export default ThemeContext;
