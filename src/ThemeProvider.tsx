import { CssBaseline, PaletteMode, Theme, ThemeOptions } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  PaletteColor,
  createTheme,
  decomposeColor,
  responsiveFontSizes,
} from '@mui/material/styles';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

// Module augmentation for custom theme properties
declare module '@mui/material/styles' {
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

declare module '@mui/material/styles/createPalette' {
  interface PaletteColor {
    superLight?: string;
    veryLight?: string;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightSemiBold: number;
  }
  interface Typography {
    fontWeightSemiBold: number;
  }
}

// Light Mode
const primaryColorsLight = {
  main: '#5567C8',
  light: '#7F8DF1',
  dark: '#3A4490',
  contrastText: '#FFFFFF',
};

const secondaryColorsLight = {
  main: '#F08A5D',
  light: '#F6B89C',
  dark: '#C56F47',
  contrastText: '#FFFFFF',
};

const backgroundLight = {
  default: '#F9F9F9',
  paper: '#FFFFFF',
};

const textLight = {
  primary: '#333333',
  secondary: '#666666',
};

// Dark Mode
const primaryColorsDark = {
  main: '#7B92DB',
  light: '#A0B3F0',
  dark: '#5360A4',
  contrastText: '#FFFFFF',
};

const secondaryColorsDark = {
  // main: '#F2A585',
  // light: '#F7CBB6',
  // dark: '#C98568',
  main: '#F2A585', // Warm peach tone
  light: '#F7CBB6', // Soft pastel peach
  dark: '#D77350', // Richer, more saturated warm coral
  contrastText: '#FFFFFF',
};

const backgroundDark = {
  default: '#141414',
  paper: '#1E1E1E',
};

const textDark = {
  primary: '#E0E0E0',
  secondary: '#B0B0B0',
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
  drawerWidth: 340,
};

// Generate the theme
const generateTheme = (mode: PaletteMode): Theme => {
  const options: ThemeOptions = {
    mixins,
    shape: { borderRadius: 2 },
    palette: {
      mode,
      primary: mode === 'light' ? primaryColorsLight : primaryColorsDark,
      secondary: mode === 'light' ? secondaryColorsLight : secondaryColorsDark,
      background: {
        default:
          mode === 'light' ? backgroundLight.default : backgroundDark.default,
        paper: mode === 'light' ? backgroundLight.paper : backgroundDark.paper,
      },
      text: {
        primary: mode === 'light' ? textLight.primary : textDark.primary,
        secondary: mode === 'light' ? textLight.secondary : textDark.secondary,
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              '& svg': {
                opacity: 0.8,
              },
            },
            '&:active': {
              '& svg': {
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
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
            },
            '&:active': {
              opacity: 0.9,
            },
          },
          outlined: {
            '&:active': {
              opacity: 0.8,
            },
          },
          text: {
            '&:active': {
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
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#212121' : '#E0E0E0',
          },
        },
      },
    },
    typography: {
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightSemiBold: 600,
      fontWeightBold: 700,

      // Headlines
      h1: {
        fontWeight: 700,
        fontSize: '2.75rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.25rem',
        lineHeight: 1.3,
        letterSpacing: '-0.015em',
        '@media (max-width:600px)': {
          fontSize: '1.75rem',
        },
      },
      h3: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.5,
        letterSpacing: '0em',
        '@media (max-width:600px)': {
          fontSize: '1.25rem',
        },
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
        '@media (max-width:600px)': {
          fontSize: '1rem',
        },
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.015em',
        '@media (max-width:600px)': {
          fontSize: '0.875rem',
        },
      },

      // Subtitles
      subtitle1: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },

      // Body text
      body1: {
        fontWeight: 400,
        fontSize: '0.9375rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      body2: {
        fontWeight: 400,
        fontSize: '0.84375rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },

      // Buttons
      button: {
        fontWeight: 600,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.02em',
        textTransform: 'none',
      },

      // Captions
      caption: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.4,
        letterSpacing: '0.02em',
      },

      // Overlines
      overline: {
        fontWeight: 600,
        fontSize: '0.6875rem',
        lineHeight: 2,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
    },
  };

  return createTheme(options);
};

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useThemeMode = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('themeMode') === 'dark';
  });

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = useMemo(() => {
    const mode = isDarkMode ? 'dark' : 'light';
    return responsiveFontSizes(generateTheme(mode));
  }, [isDarkMode]);

  const themeMode = useMemo(
    () => ({
      toggleTheme,
      isDarkMode,
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeMode}>
      <CssBaseline />
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
