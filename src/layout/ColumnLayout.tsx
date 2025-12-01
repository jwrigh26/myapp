import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import './column-layout.css';

interface ColumnLayoutProps extends PropsWithChildren<{}> {
  id?: string;
  className?: string;
  marginTop?: string | number;
  marginBottom?: string | number;
}

export const StyledColumnLayout = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'marginTop' && prop !== 'marginBottom',
})<{ marginTop?: string | number; marginBottom?: string | number }>(
  ({ theme, marginTop, marginBottom }) => ({
    // Override CSS custom properties with theme values
    '--padding-inline': theme.spacing(2),

    // Theme-specific styling
    backgroundColor: theme.palette.background.paper,

    // Dynamic margins from props
    ...(marginTop !== undefined && {
      marginTop:
        typeof marginTop === 'number' ? theme.spacing(marginTop) : marginTop,
    }),
    ...(marginBottom !== undefined && {
      marginBottom:
        typeof marginBottom === 'number'
          ? theme.spacing(marginBottom)
          : marginBottom,
    }),

    // Inline code styling
    '& code': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
      color:
        theme.palette.mode === 'light'
          ? theme.palette.text.primary
          : theme.palette.text.secondary,
      padding: theme.spacing(0.5, 1),
      borderRadius: theme.shape.borderRadius,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.caption.fontSize,
    },

    // Responsive behavior
    [theme.breakpoints.down('md')]: {
      '--padding-inline': theme.spacing(2),
    },

    [theme.breakpoints.down('sm')]: {
      '--padding-inline': theme.spacing(2),
      '--content-max-width': '100%',
      '--breakout-max-width': '100%',
      ...(marginTop !== undefined && { marginTop: 0 }),
    },
  })
);

const ColumnLayout = ({
  children,
  id,
  className,
  marginTop,
  marginBottom,
}: ColumnLayoutProps) => {
  const combinedClassName = `column-layout-base ${className || ''}`.trim();

  return (
    <StyledColumnLayout
      id={id}
      className={combinedClassName}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {children}
    </StyledColumnLayout>
  );
};

export default ColumnLayout;
