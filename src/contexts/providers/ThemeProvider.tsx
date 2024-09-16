import { CssBaseline } from "@mui/material/";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import ThemeContext from "contexts/ThemeContext";
import { ThemeContextProps } from "global";
import React, { ReactNode, useMemo, useState } from "react";

const ThemeProvider = ({ children }: ThemeContextProps): ReactNode => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Define the theme based on the current state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: isDarkMode ? "#ffffff" : "#202020",
          },
          background: {
            default: isDarkMode ? "#202020" : "#ffffff", // Change background color here
            paper: isDarkMode ? "#202020" : "#ffffff", // For MUI components
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: isDarkMode ? "#202020" : "#ffffff", // Global background color
                color: isDarkMode ? "#ffffff" : "#202020", // Global text color
                transition: "background-color 0.3s ease", // Smooth transition on toggle
              },
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: "#484848",
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  // Pass down the context value
  const themeContextValue = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
