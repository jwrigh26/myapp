/**
 * Displays formatted text content with optional title and subtitle.
 *
 * "Prose" refers to ordinary written content styled for readability.
 * Maintains consistent typography using Material UI design.
 */
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface ProseBlockProps {
  title?: string;
  subtitle?: string;
  /**
   * Children should generally be text, inline elements, or other elements suitable for wrapping in Typography.
   */
  children?: React.ReactNode;
  dense?: boolean;
  spacingBottom?: boolean;
  backgroundColor?: string;
  options?: {
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    subtitleVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
    textVariant?: 'body1' | 'body2' | 'caption' | 'overline';
    titleComponent?: React.ElementType;
    subtitleComponent?: React.ElementType;
    textComponent?: React.ElementType;
  };
}

function ProseBlock({
  title,
  subtitle,
  children,
  dense = false,
  spacingBottom = false,
  backgroundColor,
  options = {}, // Default to an empty object
}: ProseBlockProps): JSX.Element {
  const {
    // Variant defaults
    titleVariant = 'h4',
    subtitleVariant = 'subtitle1',
    textVariant = 'body1',
    // Component defaults
    titleComponent = 'h2',
    subtitleComponent = 'p',
    textComponent = 'div',
  } = options;

  return (
    <StyledBlock
      dense={dense}
      spacingBottom={spacingBottom}
      backgroundColor={backgroundColor}
    >
      {title && (
        <Typography
          variant={titleVariant}
          component={titleComponent}
          color="primary.main"
          gutterBottom
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant={subtitleVariant}
          component={subtitleComponent}
          gutterBottom
          color="text.secondary"
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant={textVariant}
        component={textComponent}
        color="text.primary"
      >
        {children}
      </Typography>
    </StyledBlock>
  );
}

export default ProseBlock;

//#######################################
//### Styles
//#######################################

interface StyledBlockProps extends BoxProps {
  dense: boolean;
  gutterBottom?: boolean;
  spacingBottom?: boolean;
  backgroundColor?: string;
}

const getPaddingStyles = (
  theme: any,
  dense: boolean,
  spacingBottom?: boolean
) => {
  const paddingStyles = dense
    ? {
        padding: theme.spacing(0, 2),
        // paddingBottom: theme.spacing(2),
      }
    : {
        padding: theme.spacing(0),
      };

  const spacingBottomStyles = spacingBottom
    ? { paddingBottom: theme.spacing(2) }
    : { paddingBottom: theme.spacing(0) };

  return {
    ...paddingStyles,
    ...spacingBottomStyles,
  };
};

const StyledBlock = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'dense' &&
    prop !== 'gutterBottom' &&
    prop !== 'spacingBottom' &&
    prop !== 'backgroundColor',
})<StyledBlockProps>(({
  theme,
  dense,
  gutterBottom,
  spacingBottom,
  backgroundColor = theme.palette.background.paper,
}) => {
  const paddingStyles = getPaddingStyles(theme, dense, spacingBottom);

  const gutterBottomStyles = gutterBottom
    ? { marginBottom: theme.spacing(1) }
    : {};

  return {
    marginBottom: theme.spacing(0), // Add spacing between blocks
    backgroundColor, // Optional: Add a background
    borderRadius: theme.shape.borderRadius,
    ...paddingStyles,
    ...gutterBottomStyles,
    '& ul, & ol': {
      marginTop: theme.spacing(1),
      marginBottom: 0,
      paddingLeft: theme.spacing(3),
      '& li': {
        marginBottom: theme.spacing(1),
        color: theme.palette.text.secondary,
        '&::marker': {
          color: theme.palette.primary.main,
        },
      },
    },
    '& span.code': {
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
  };
});
