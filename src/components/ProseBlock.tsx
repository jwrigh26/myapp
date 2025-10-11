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
  anchor?: boolean; // If true, adds anchor id for linking
  id?: string;
  title?: string;
  subtitle?: string;
  /**
   * Children should generally be text, inline elements, or other elements suitable for wrapping in Typography.
   */
  children?: React.ReactNode;
  dense?: boolean;
  spacingTop?: boolean;
  spacingBottom?: boolean;
  backgroundColor?: string;
  color?: string; // Override default text.primary color
  options?: {
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    subtitleVariant?: 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
    textVariant?: 'body1' | 'body2' | 'caption' | 'overline';
    titleComponent?: React.ElementType;
    titleColor?: string;
    subtitleComponent?: React.ElementType;
    subtitleColor?: string;
    textComponent?: React.ElementType;
  };
}

const ProseBlock = React.memo(
  function ProseBlock({
    anchor = false,
    id,
    title,
    subtitle,
    children,
    dense = false,
    spacingTop = false,
    spacingBottom = true,
    backgroundColor,
    color = 'text.primary', // Default to text.primary
    options = {}, // Default to an empty object
  }: ProseBlockProps): JSX.Element {
    const {
      // Variant defaults
      titleVariant = 'h4',
      subtitleVariant = 'subtitle1',
      textVariant = 'body1',
      // Component defaults
      titleComponent = 'h2',
      titleColor = "primary.main",
      subtitleComponent = 'p',
      subtitleColor = "text.secondary",
      textComponent = 'div',
    } = options;

    const titleGutter = !subtitle;

    return (
      <StyledBlock
        id={id}
        dense={dense}
        spacingTop={spacingTop}
        spacingBottom={spacingBottom}
        backgroundColor={backgroundColor}
        className={anchor && id ? 'anchor-section' : undefined}
      >
        {title && (
          <Typography
            variant={titleVariant}
            component={titleComponent}
            color={titleColor || "primary.main"}
            gutterBottom={titleGutter}
            className={anchor ? 'anchor-title' : undefined}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant={subtitleVariant}
            component={subtitleComponent}
            gutterBottom
            color={subtitleColor || "text.secondary"}
            className={!title && anchor ? 'anchor-title' : undefined}
          >
            {subtitle}
          </Typography>
        )}
        <Typography
          variant={textVariant}
          component={textComponent}
          color={color}
        >
          {children}
        </Typography>
      </StyledBlock>
    );
  },
  (prevProps, nextProps) => {
    // Compare all primitive props for performance optimization
    return (
      prevProps.id === nextProps.id &&
      prevProps.title === nextProps.title &&
      prevProps.subtitle === nextProps.subtitle &&
      prevProps.dense === nextProps.dense &&
      prevProps.spacingBottom === nextProps.spacingBottom &&
      prevProps.backgroundColor === nextProps.backgroundColor &&
      prevProps.color === nextProps.color &&
      // Stable references (options is usually a static object, children typically stable in blog context)
      prevProps.options === nextProps.options &&
      prevProps.children === nextProps.children
    );
  }
);

ProseBlock.displayName = 'ProseBlock';

export { ProseBlock };
export default ProseBlock;

//#######################################
//### Styles
//#######################################

interface StyledBlockProps extends BoxProps {
  dense: boolean;
  gutterBottom?: boolean;
  spacingBottom?: boolean;
  spacingTop?:boolean;
  backgroundColor?: string;
}

const getPaddingStyles = (
  theme: any,
  dense: boolean,
  spacingBottom?: boolean,
  spacingTop?: boolean
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

  const spacingTopStyles = spacingTop ? { paddingTop: theme.spacing(2) } : { paddingTop: theme.spacing(0) };

  return {
    ...paddingStyles,
    ...spacingBottomStyles,
    ...spacingTopStyles,
  };
};

const StyledBlock = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'dense' &&
    prop !== 'gutterBottom' &&
    prop !== 'spacingTop' &&
    prop !== 'spacingBottom' &&
    prop !== 'backgroundColor',
})<StyledBlockProps>(({
  theme,
  dense,
  gutterBottom,
  spacingTop,
  spacingBottom,
  backgroundColor = theme.palette.background.paper,
}) => {
  const paddingStyles = getPaddingStyles(theme, dense, spacingBottom, spacingTop);

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
    '& span.name, & span.bold': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      padding: theme.spacing(0.25, 0.75),
      marginRight: theme.spacing(0.25),
      marginLeft: theme.spacing(0.25),
      borderRadius: theme.shape.borderRadius,
    },
    '& span.name-alt, span.bold-alt': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      padding: theme.spacing(0.25, 0.75),
      marginRight: theme.spacing(0.25),
      marginLeft: theme.spacing(0.25),
      borderRadius: theme.shape.borderRadius,
    },
  };
});
