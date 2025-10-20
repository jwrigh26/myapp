import React, { createContext, useContext, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define breakpoint keys that match MUI
/** 
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
*/
export type BreakpointKey =
  | 'xs'
  | 'mobile'
  | 'mobileLg'
  | 'sm'
  | 'tablet'
  | 'md'
  | 'lg'
  | 'xl';

interface BreakpointContextType {
  current: BreakpointKey;
  up: Record<BreakpointKey, boolean>;
  down: Record<BreakpointKey, boolean>;
  only: Record<BreakpointKey, boolean>;
}

// Defaults will never be used but defined this way for better type safety
// and to avoid undefined checks in consuming components.
// Could have done up: {} as Record<BreakpointKey, boolean> but this is clearer.
// We could have just thrown an error if context is missing, but having defaults
// makes it safer in case someone forgets to wrap in the provider.
const BreakpointContext = createContext<BreakpointContextType>({
  current: 'md',
  up: {
    xs: true,
    mobile: true,
    mobileLg: true,
    tablet: true,
    sm: true,
    md: true,
    lg: false,
    xl: false,
  },
  down: {
    xs: false,
    mobile: false,
    mobileLg: false,
    tablet: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
  },
  only: {
    xs: false,
    mobile: false,
    mobileLg: false,
    tablet: false,
    sm: false,
    md: true,
    lg: false,
    xl: false,
  },
});

interface BreakpointProviderProps {
  children: React.ReactNode;
}

export function BreakpointProvider({ children }: BreakpointProviderProps) {
  // Only 6 global useMediaQuery subscriptions instead of 80+
  const isXlUp = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const isTabletUp = useMediaQuery((theme) => theme.breakpoints.up('tablet'));
  const isSmUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const isMobileLgUp = useMediaQuery((theme) =>
    theme.breakpoints.up('mobileLg')
  );
  const isMobileUp = useMediaQuery((theme) => theme.breakpoints.up('mobile'));

  const contextValue = useMemo((): BreakpointContextType => {
    // Determine current breakpoint
    let current: BreakpointKey;
    if (isXlUp) current = 'xl';
    else if (isLgUp) current = 'lg';
    else if (isMdUp) current = 'md';
    else if (isTabletUp) current = 'tablet';
    else if (isSmUp) current = 'sm';
    else if (isMobileLgUp) current = 'mobileLg';
    else if (isMobileUp) current = 'mobile';
    else current = 'xs';

    // Calculate up/down/only for all breakpoints
    const up: Record<BreakpointKey, boolean> = {
      xs: true, // xs and up is always true
      mobile: isMobileUp,
      mobileLg: isMobileLgUp,
      tablet: isTabletUp,
      sm: isSmUp,
      md: isMdUp,
      lg: isLgUp,
      xl: isXlUp,
    };

    const down: Record<BreakpointKey, boolean> = {
      xs: !isMobileUp, // xs only when not mobile+
      mobile: !isMobileLgUp,
      mobileLg: !isTabletUp,
      tablet: !isSmUp,
      sm: !isMdUp,
      md: !isLgUp,
      lg: !isXlUp,
      xl: false, // xl and down is always false (no breakpoint above xl)
    };

    const only: Record<BreakpointKey, boolean> = {
      xs: !isMobileUp,
      mobile: isMobileUp && !isMobileLgUp,
      mobileLg: isMobileLgUp && !isTabletUp,
      tablet: isTabletUp && !isSmUp,
      sm: isSmUp && !isMdUp,
      md: isMdUp && !isLgUp,
      lg: isLgUp && !isXlUp,
      xl: isXlUp,
    };

    return {
      current,
      up,
      down,
      only,
    };
  }, [isXlUp, isLgUp, isMdUp, isTabletUp, isSmUp, isMobileLgUp, isMobileUp]);

  return (
    <BreakpointContext.Provider value={contextValue}>
      {children}
    </BreakpointContext.Provider>
  );
}

// Hook to use the breakpoint context
export function useBreakpoint(): BreakpointContextType {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error('useBreakpoint must be used within a BreakpointProvider');
  }
  return context;
}

// Convenience hooks for common usage patterns
export function useActiveBreakpointKey(): BreakpointKey {
  const { current } = useBreakpoint();
  return current;
}

export function useIsBreakpointUp(breakpoint: BreakpointKey): boolean {
  const { up } = useBreakpoint();
  return up[breakpoint];
}

export function useIsBreakpointDown(breakpoint: BreakpointKey): boolean {
  const { down } = useBreakpoint();
  return down[breakpoint];
}

export function useIsBreakpointOnly(breakpoint: BreakpointKey): boolean {
  const { only } = useBreakpoint();
  return only[breakpoint];
}

// Legacy compatibility - matches the old useMediaQuery pattern
export function useIsMobile(): boolean {
  const { down } = useBreakpoint();
  return down.sm; // down from sm = xs only
}

export function useIsTablet(): boolean {
  const { only } = useBreakpoint();
  return only.tablet; // tablet only
}

export function useIsDesktop(): boolean {
  const { up } = useBreakpoint();
  return up.lg; // lg and up
}
