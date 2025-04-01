import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

interface StyledGridProps {
  gap: number;
  padding: number;
  color?: string;
}

const StyledGrid = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'gap' && prop !== 'padding' && prop !== 'color',
})<StyledGridProps>(({ color, theme, gap, padding }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gap: theme.spacing(gap),
  padding: theme.spacing(padding),
  backgroundColor: color || theme.palette.background.paper,
  maxWidth: '1536px',
  width: '100%',
  margin: '0 auto',
}));

interface PageLayoutProps extends PropsWithChildren<{}> {
  gap?: number;
  padding?: number;
  id?: string;
  color?: string;
}

const PageLayout = ({
  children,
  gap = 2,
  padding = 2,
  id,
  color,
}: PageLayoutProps) => {
  return (
    <StyledGrid color={color} gap={gap} padding={padding} id={id}>
      {children}
    </StyledGrid>
  );
};

export default PageLayout;
