import { useMediaQuery, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useIsMobile } from '@/context/BreakpointContext';
import { Spacer } from '@/components/Spacer';

export const ComicWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
})) as typeof Box;

// We will suport content, breakout, and fullwidth possibly

// We want a breakout for desktop and full-width if isMobile
// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// What to call it?

// ComicPanel
// attributes:
// - fullWidth ( desktop breakout & mobile full-width )

const ComicInternalGrid = styled(Box, {
  shouldForwardProp: (prop) => !['columns', 'gap'].includes(prop as string),
})<{ columns?: string; gap?: number }>(
  ({ theme, gap = 2, columns = '1fr 1fr' }) => ({
    alignItems: 'stretch',
    display: 'grid',
    gap: theme.spacing(gap),
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto',
    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(gap),
      gridTemplateColumns: columns,
      gridTemplateRows: '1fr',
    },
    width: '100%',
  })
);

export interface ComicPanelProps {
  children: React.ReactNode;
  columns?: string;
  gap?: number;
  id?: string;
}

export function ComicBreakoutPanel({
  children,
  columns = '1fr',
  gap = 2,
  id,
}: ComicPanelProps) {
  // Prefer the theme-callback form; it's more performant and avoids
  // reading the theme synchronously from the module scope.
  const isMobile = useIsMobile();
  return (
    <>
      <Spacer size={gap} />
      <ComicWrapper className={isMobile ? 'fullwidth' : 'breakout'}>
        <ComicInternalGrid columns={columns} gap={0} id={id}>
          {children}
        </ComicInternalGrid>
      </ComicWrapper>
    </>
  );
}

export function ComicPanel({
  children,
  columns = '1fr 1fr',
  gap = 2,
  id,
}: ComicPanelProps) {
  const isMobile = useIsMobile();
  return (
    <>
      <Spacer size={gap} />
      <ComicWrapper className={isMobile ? 'fullwidth' : 'breakout'}>
        <ComicInternalGrid columns={columns} gap={gap} id={id}>
          {children}
        </ComicInternalGrid>
      </ComicWrapper>
    </>
  );
}
