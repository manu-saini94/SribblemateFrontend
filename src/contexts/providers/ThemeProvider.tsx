import ThemeContext from "contexts/ThemeContext";
import { ThemeContextProps } from "global";
import React, { ReactNode, useMemo, useState } from "react";

const ThemeProvider = ({ children }: ThemeContextProps): ReactNode => {
  const [isDarkMode, setIsDarkMode] = useState<Boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const themeContextValue = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
