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

// Custom Colors
const primaryColors = {
  main: "#666B64", // granite green
  light: "#C1D1CF", // jet stream
  dark: "#636467", // granite gray
  veryLight: "#748B91", // slate gray
  superLight: "#EFF3F3", // anti-flash white
};

const primaryDarkColors = {
  main: "#171F22", // dark jungle green
  light: "#2A3338", // charcoal
  dark: "#0F1416", // eerie black
  veryLight: "#475A5E", // independence
  superLight: "#8DA2A5", // cadet blue
};

const secondaryColors = {
  main: "#748B91", // slate gray
  light: "#C1D1CF", // jet stream
  dark: "#475A5E", // independence
  veryLight: "#EFF3F3", // anti-flash white
  superLight: "#F5FAFA", // mint cream
  contrastText: "#ffffff", // white
};

const secondaryDarkColors = {
  main: "#C1D1CF", // jet stream
  light: "#EFF3F3", // anti-flash white
  dark: "#8DA2A5", // cadet blue
  veryLight: "#D7E0DF", // gainsboro
  superLight: "#F5FAFA", // mint cream
  contrastText: "#171F22", // dark jungle green
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

// Generate light and dark themes

const generateTheme = (mode: PaletteMode): Theme => {
  // Define options with explicit typing
  const options: ThemeOptions = {
    mixins,
    shape: {
      borderRadius: 2,
    },
    palette: {
      mode,
      primary: mode === "light" ? primaryColors : primaryDarkColors,
      secondary: mode === "light" ? secondaryColors : secondaryDarkColors,
      background: {
        default: mode === "light" ? "#FFFFFF" : "#171F22",
        paper: mode === "light" ? "#EFF3F3" : "#2A3338",
      },
      text: {
        primary: mode === "light" ? "#171F22" : "#EFF3F3",
        secondary: mode === "light" ? "#2A3338" : "#8DA2A5",
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
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
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 2,
          },
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
        fontSize: "2.75rem", // Slightly smaller than before (44px)
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        "@media (max-width:600px)": {
          fontSize: "2rem", // Adjust for mobile (32px)
        },
      },
      h2: {
        fontWeight: 600,
        fontSize: "2.25rem", // Slightly smaller (36px)
        lineHeight: 1.3,
        letterSpacing: "-0.015em",
        "@media (max-width:600px)": {
          fontSize: "1.75rem", // Adjust for mobile (28px)
        },
      },
      h3: {
        fontWeight: 600,
        fontSize: "2rem", // No change (32px)
        lineHeight: 1.4,
        letterSpacing: "-0.01em",
        "@media (max-width:600px)": {
          fontSize: "1.5rem", // Adjust for mobile (24px)
        },
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem", // Smaller (24px)
        lineHeight: 1.5,
        letterSpacing: "0em",
        "@media (max-width:600px)": {
          fontSize: "1.25rem", // Adjust for mobile (20px)
        },
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.25rem", // Smaller (20px)
        lineHeight: 1.6,
        letterSpacing: "0.01em",
        "@media (max-width:600px)": {
          fontSize: "1rem", // Adjust for mobile (16px)
        },
      },
      h6: {
        fontWeight: 500,
        fontSize: "1rem", // Smaller (16px)
        lineHeight: 1.6,
        letterSpacing: "0.015em",
        "@media (max-width:600px)": {
          fontSize: "0.875rem", // Adjust for mobile (14px)
        },
      },

      // Subtitles
      subtitle1: {
        fontWeight: 500,
        fontSize: "1rem", // Reduced (16px)
        lineHeight: 1.6, // Improved spacing
        letterSpacing: "0.01em",
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: "0.875rem", // Reduced (14px)
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      },

      // Body text
      body1: {
        fontWeight: 400,
        fontSize: "0.9375rem", // Slightly smaller (15px)
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.8125rem", // Slightly smaller (13px)
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      },

      // Buttons
      button: {
        fontWeight: 600,
        fontSize: "0.875rem", // No change (14px)
        lineHeight: 1.5,
        letterSpacing: "0.02em", // Slightly increased for better readability
        textTransform: "none",
      },

      // Captions
      caption: {
        fontWeight: 400,
        fontSize: "0.75rem", // No change (12px)
        lineHeight: 1.4, // Reduced spacing for better balance
        letterSpacing: "0.02em",
      },

      // Overlines
      overline: {
        fontWeight: 600,
        fontSize: "0.6875rem", // Slightly smaller (11px)
        lineHeight: 2, // Reduced spacing
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
    },
  };

  // Create and return the theme
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

export default function ThemeProvider({
  children,
}: ThemeProviderProps): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(() => {
    const mode = isDarkMode ? "dark" : "light";
    const m = responsiveFontSizes(generateTheme(mode));
    console.log(m);
    return m;
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <CssBaseline />
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
