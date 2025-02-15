import { CssBaseline, PaletteMode, Theme, ThemeOptions } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  PaletteColor,
  createTheme,
  decomposeColor,
  responsiveFontSizes,
} from "@mui/material/styles";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

// Module augmentation for custom theme properties
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      neutral: PaletteColor;
      secondary: PaletteColor;
    };
  }
  interface PaletteOptions {
    custom?: {
      neutral?: Partial<PaletteColor>;
      secondary?: Partial<PaletteColor>;
    };
  }
  interface Mixins {
    elevation: (level: number) => string;
    decomposeColor: (color: string, opacity: number) => string;
    drawerWidth: number;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    superLight?: string;
    veryLight?: string;
  }
}

declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    fontWeightSemiBold: number;
  }
  interface Typography {
    fontWeightSemiBold: number;
  }
}

// Light Mode
const primaryColorsLight = {
  main: "#6A5B9A", // Dusty purple
  light: "#8B7BB8", // Lighter dusty purple
  dark: "#4F3F71", // Deeper purple
  contrastText: "#FFFFFF",
};

const secondaryColorsLight = {
  main: "#A37BAF", // Soft violet-lilac
  light: "#C895D7", // Lighter pastel violet
  dark: "#7F4F87", // Deeper accent
  contrastText: "#FFFFFF",
};

// Dark Mode
const primaryColorsDark = {
  main: "#8B7BB8", // Brightened for dark backgrounds
  light: "#B2A7D2", // Even lighter dusty purple
  dark: "#6A5B9A", // Slightly deeper
  contrastText: "#FFFFFF",
};

const secondaryColorsDark = {
  main: "#C895D7", // Lighter for dark mode
  light: "#E3C1EC", // Very pale dusty violet
  dark: "#A37BAF", // Slightly deeper accent
  contrastText: "#FFFFFF",
};

// Mixins
const mixins = {
  elevation: (level: number): string =>
    `box-shadow: 0px ${level}px ${level * 2}px rgba(0, 0, 0, 0.12)`,
  decomposeColor: (color: string, opacity: number): string => {
    const {
      values: [r, g, b],
    } = decomposeColor(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity || 1})`;
  },
  drawerWidth: 240,
};

// Generate the theme
const generateTheme = (mode: PaletteMode): Theme => {
  const options: ThemeOptions = {
    mixins,
    shape: { borderRadius: 2 },
    palette: {
      mode,
      primary: mode === "light" ? primaryColorsLight : primaryColorsDark,
      secondary: mode === "light" ? secondaryColorsLight : secondaryColorsDark,
      background: {
        default: mode === "light" ? "#F5F5F5" : "#121212",
        paper: mode === "light" ? "#FFFFFF" : "#1E1E1E",
      },
      text: {
        primary: mode === "light" ? "#212121" : "#E0E0E0",
        secondary: mode === "light" ? "#424242" : "#B0B0B0",
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              "& svg": {
                opacity: 0.8,
              },
            },
            "&:active": {
              "& svg": {
                opacity: 0.6,
              },
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: { borderRadius: 2 },
          contained: {
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            },
            "&:active": {
              opacity: 0.9,
            },
          },
          outlined: {
            "&:active": {
              opacity: 0.8,
            },
          },
          text: {
            "&:active": {
              opacity: 0.8,
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 8,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
    },
    typography: {
      fontFamily: "Inter, Arial, sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightSemiBold: 600,
      fontWeightBold: 700,

      // Headlines
      h1: {
        fontWeight: 700,
        fontSize: "2.75rem",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        "@media (max-width:600px)": {
          fontSize: "2rem",
        },
      },
      h2: {
        fontWeight: 600,
        fontSize: "2.25rem",
        lineHeight: 1.3,
        letterSpacing: "-0.015em",
        "@media (max-width:600px)": {
          fontSize: "1.75rem",
        },
      },
      h3: {
        fontWeight: 600,
        fontSize: "2rem",
        lineHeight: 1.4,
        letterSpacing: "-0.01em",
        "@media (max-width:600px)": {
          fontSize: "1.5rem",
        },
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.5,
        letterSpacing: "0em",
        "@media (max-width:600px)": {
          fontSize: "1.25rem",
        },
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.25rem",
        lineHeight: 1.6,
        letterSpacing: "0.01em",
        "@media (max-width:600px)": {
          fontSize: "1rem",
        },
      },
      h6: {
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1.6,
        letterSpacing: "0.015em",
        "@media (max-width:600px)": {
          fontSize: "0.875rem",
        },
      },

      // Subtitles
      subtitle1: {
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1.6,
        letterSpacing: "0.01em",
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      },

      // Body text
      body1: {
        fontWeight: 400,
        fontSize: "0.9375rem",
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.84375rem",
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      },

      // Buttons
      button: {
        fontWeight: 600,
        fontSize: "0.875rem",
        lineHeight: 1.5,
        letterSpacing: "0.02em",
        textTransform: "none",
      },

      // Captions
      caption: {
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 1.4,
        letterSpacing: "0.02em",
      },

      // Overlines
      overline: {
        fontWeight: 600,
        fontSize: "0.6875rem",
        lineHeight: 2,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
    },
  };

  return createTheme(options);
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useThemeMode = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("themeMode") === "dark";
  });

  const theme = useMemo(() => {
    const mode = isDarkMode ? "dark" : "light";
    return responsiveFontSizes(generateTheme(mode));
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  console.log(theme);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <CssBaseline />
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
