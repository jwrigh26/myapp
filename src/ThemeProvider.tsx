import { CssBaseline, PaletteMode } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  PaletteColor,
  ThemeOptions,
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
};

// Generate light and dark themes
const generateTheme = (mode: PaletteMode): ThemeOptions => ({
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
      secondary: mode === "light" ? "#C1D1CF" : "#8DA2A5",
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
      fontSize: "3rem", // 48px
      lineHeight: 1.2, // 115%
      letterSpacing: "-0.01562em",
      "@media (max-width:600px)": {
        fontSize: "2.25rem", // 36px
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem", // 40px
      lineHeight: 1.3, // 130%
      letterSpacing: "-0.00833em",
      "@media (max-width:600px)": {
        fontSize: "2rem", // 32px
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem", // 32px
      lineHeight: 1.4, // 140%
      letterSpacing: "0em",
      "@media (max-width:600px)": {
        fontSize: "1.75rem", // 28px
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem", // 28px
      lineHeight: 1.5, // 150%
      letterSpacing: "0.00735em",
      "@media (max-width:600px)": {
        fontSize: "1.5rem", // 24px
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem", // 24px
      lineHeight: 1.6, // 160%
      letterSpacing: "0em",
      "@media (max-width:600px)": {
        fontSize: "1.25rem", // 20px
      },
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem", // 20px
      lineHeight: 1.6, // 160%
      letterSpacing: "0.0075em",
      "@media (max-width:600px)": {
        fontSize: "1.125rem", // 18px
      },
    },

    // Subtitles
    subtitle1: {
      fontWeight: 500,
      fontSize: "1.125rem", // 18px
      lineHeight: 1.75, // 175%
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "1rem", // 16px
      lineHeight: 1.57, // 157%
      letterSpacing: "0.00714em",
    },

    // Body text
    body1: {
      fontWeight: 400,
      fontSize: "1rem", // 16px
      lineHeight: 1.5, // 150%
      letterSpacing: "0.00938em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem", // 14px
      lineHeight: 1.43, // 143%
      letterSpacing: "0.01071em",
    },

    // Buttons
    button: {
      fontWeight: 600,
      fontSize: "0.875rem", // 14px
      lineHeight: 1.75, // 175%
      letterSpacing: "0.02857em",
      textTransform: "none", // Keep button text sentence case
    },

    // Captions
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.66, // 166%
      letterSpacing: "0.03333em",
    },

    // Overlines
    overline: {
      fontWeight: 600,
      fontSize: "0.75rem", // 12px
      lineHeight: 2.66, // 266%
      letterSpacing: "0.08333em",
      textTransform: "uppercase", // Traditional styling for overlines
    },
  },

  shape: {
    borderRadius: 2,
  },
  mixins,
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
          // Target only contained variant
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          },
          "&:active": {
            opacity: 0.9, // Subtle opacity change for active state
            // color: mode === "light" ? "#8DA2A5" : "#171F22",
          },
        },
        outlined: {
          // Target only outlined variant
          "&:active": {
            opacity: 0.8, // Subtle opacity change for active state
          },
        },
        text: {
          // Target only text variant
          "&:active": {
            opacity: 0.8, // Subtle opacity change for active state
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
});

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
    return responsiveFontSizes(createTheme(generateTheme(mode)));
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // console.log(theme);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <CssBaseline />
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
