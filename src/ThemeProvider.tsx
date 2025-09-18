import { CssBaseline, PaletteMode, Theme, ThemeOptions } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  PaletteColor,
  createTheme,
  decomposeColor,
  responsiveFontSizes,
} from '@mui/material/styles';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Module augmentation for custom theme properties
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    tablet: true; // custom breakpoint at 720px
    md: true;
    lg: true;
    xl: true;
    // Add custom breakpoints
    mobile: true; // 375px
    mobileLg: true; // 414px
  }
  
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
    comic?: React.CSSProperties;
  }
  interface Typography {
    fontWeightSemiBold: number;
    comic: React.CSSProperties;
  }
}

// Memoize static color objects
const COLORS = {
  light: {
    primary: {
      main: '#5567C8',
      light: '#7F8DF1',
      superLight: '#B8C3F7',
      dark: '#3A4490',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F08A5D',
      light: '#F6B89C',
      dark: '#C56F47',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9F9F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  dark: {
    primary: {
      main: '#6C8AE4',
      light: '#95B1FF',
      superLight: '#C5D3FF',
      dark: '#4558B2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF9366',
      light: '#FFBDA0',
      dark: '#E06B45',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#141414',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
  },
} as const;

// Memoize mixins
const MIXINS = {
  elevation: (level: number): string =>
    `box-shadow: 0px ${level}px ${level * 2}px rgba(0, 0, 0, 0.12)`,
  decomposeColor: (color: string, opacity: number): string => {
    const {
      values: [r, g, b],
    } = decomposeColor(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity || 1})`;
  },
  drawerWidth: 240,
} as const;

// Memoize typography config
const TYPOGRAPHY_CONFIG = {
  fontFamily: 'Inter, Arial, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  // Add comic typography variant
  comic: {
    fontFamily: '"Happy Monkey", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.25,
    letterSpacing: '0.005em',
  },
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
  button: {
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    textTransform: 'none' as const,
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.02em',
  },
  overline: {
    fontWeight: 600,
    fontSize: '0.6875rem',
    lineHeight: 2,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
} as const;

// Memoize component overrides
const createComponentOverrides = (mode: PaletteMode) => ({
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
});

// Optimized theme generation with memoization
const generateTheme = (mode: PaletteMode): Theme => {
  const colors = COLORS[mode];

  const options: ThemeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        mobile: 375,
        mobileLg: 414,
        sm: 600,
        tablet: 720,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    mixins: MIXINS,
    shape: { borderRadius: 2 },
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: colors.background,
      text: colors.text,
    },
    components: createComponentOverrides(mode),
    typography: TYPOGRAPHY_CONFIG,
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
    const stored = localStorage.getItem('themeMode');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return (
      window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
    );
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Persist theme mode to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light');
    // Update document data attribute for CSS
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  // Listen for themeMode changes in other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'themeMode' && e.newValue) {
        setIsDarkMode(e.newValue === 'dark');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Listen for OS preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('themeMode');
      if (!stored) {
        setIsDarkMode(e.matches);
      }
    };

    if (mq.addEventListener) {
      mq.addEventListener('change', handleChange);
      return () => mq.removeEventListener('change', handleChange);
    }
  }, []);

  const theme = useMemo(() => {
    const mode = isDarkMode ? 'dark' : 'light';
    return responsiveFontSizes(generateTheme(mode));
  }, [isDarkMode]);

  const themeContextValue = useMemo(
    () => ({
      toggleTheme,
      isDarkMode,
    }),
    [toggleTheme, isDarkMode]
  );
  console.log(
    'ThemeProvider rendered with mode:',
    isDarkMode ? 'dark' : 'light'
  );
  console.log(theme);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
