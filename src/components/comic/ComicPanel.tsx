import { useMediaQuery, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ComicWrapper = styled(Box)(({ theme }) => ({
   marginBottom: theme.spacing(4),
   [theme.breakpoints.up('md')]: {
     marginBottom: theme.spacing(8),
   },
})) as typeof Box; 


// We will suport content, breakout, and fullwidth possibly


// We want a breakout for desktop and full-width if isMobile
// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// What to call it?

// ComicPanel
// attributes:
// - fullWidth ( desktop breakout & mobile full-width )


const ComicInternalGrid = styled(Box, {
    shouldForwardProp: (prop) => 
        !['columns', 'gap'].includes(prop as string),
})<{ columns?: string, gap?: number }>(({ theme, gap = 2, columns = '1fr 1fr' }) => ({
    alignItems: 'stretch',
    display: 'grid',
    gap: theme.spacing(gap),
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto',
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: columns,
        gridTemplateRows: '1fr', 
    },
    width: '100%',
}));

export interface ComicPanelProps {
  children: React.ReactNode;
  columns?: string;
  gap?: number;
}

export function ComicBreakoutPanel({ children, columns = '1fr', gap = 2 }: ComicPanelProps) {
    // Prefer the theme-callback form; it's more performant and avoids
    // reading the theme synchronously from the module scope.
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    return (
        <ComicWrapper className={isMobile ? 'fullwidth' : 'breakout'}>
            <ComicInternalGrid columns={columns} gap={gap}>
                {children}
            </ComicInternalGrid>
        </ComicWrapper>
    );
}


export function ComicPanel({ children, columns = '1fr 1fr', gap = 2 }: ComicPanelProps) {
    return (
        <ComicInternalGrid columns={columns} gap={gap}>
            {children}
        </ComicInternalGrid>
    );
}