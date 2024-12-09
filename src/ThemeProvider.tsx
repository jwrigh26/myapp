import { orange } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode, createContext, useContext, useState } from 'react';

// You have to use module augmentation to add custom properties to the theme.
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  
  }
}

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  status: {
    danger: orange[500],
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  status: {
    danger: orange[500],
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkMode: false,
});

/**
 * Custom hook to use the theme mode context.
 * @returns {object} - The context value containing `toggleTheme` function and `isDarkMode` boolean.
 */
export const useThemeMode = () => useContext(ThemeContext);

/**
 * ThemeProvider component to provide theme context and toggle functionality.
 * @param {ThemeProviderProps} props - The props for the ThemeProvider component.
 * @returns {JSX.Element} - The ThemeProvider component with context and MUI theme provider.
 */
export default function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Toggles the theme between light and dark mode.
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <CssBaseline />
      <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}