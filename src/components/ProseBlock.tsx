import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";

interface ProseBlockProps {
  title?: string;
  subtitle?: string;
  /**
   * Children should generally be text, inline elements, or other elements suitable for wrapping in Typography.
   */
  children: React.ReactNode;
  dense?: boolean;
  spacingBottom?: boolean;
  options?: {
    titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    subtitleVariant?: "subtitle1" | "subtitle2" | "body1" | "body2";
    textVariant?: "body1" | "body2" | "caption" | "overline";
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
  options = {}, // Default to an empty object
}: ProseBlockProps): JSX.Element {
  const {
    // Variant defaults
    titleVariant = "h5",
    subtitleVariant = "subtitle1",
    textVariant = "body1",
    // Component defaults
    titleComponent = "h2",
    subtitleComponent = "p",
    textComponent = "div",
  } = options;

  return (
    <StyledBlock dense={dense} spacingBottom={spacingBottom}>
      {title && (
        <Typography
          variant={titleVariant}
          component={titleComponent}
          color="textPrimary"
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
          color="textSecondary"
        >
          {subtitle}
        </Typography>
      )}
      <Typography variant={textVariant} component={textComponent} color="textPrimary">
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
}

const StyledBlock = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "dense" && prop !== "gutterBottom" && prop !== "spacingBottom",
})<StyledBlockProps>(({ theme, dense, gutterBottom, spacingBottom }) => {
  const paddingStyles = dense
    ? { padding: theme.spacing(0, 2), paddingBottom: theme.spacing(2) }
    : { padding: theme.spacing(2, 2) };

  const spacingBottomStyles = spacingBottom
    ? { paddingBottom: theme.spacing(2) }
    : {};

  const gutterBottomStyles = gutterBottom
    ? { marginBottom: theme.spacing(1) }
    : {};

  const liColor = theme.palette.mode === "dark" ? theme.palette.primary.superLight : theme.palette.primary.dark;
  
  return {
    marginBottom: theme.spacing(0), // Add spacing between blocks
    backgroundColor: theme.palette.background.default, // Optional: Add a background
    borderRadius: theme.shape.borderRadius,
    ...paddingStyles,
    ...spacingBottomStyles,
    ...gutterBottomStyles,
    '& ul, & ol': { // This will target both unordered and ordered lists
      margin: 0,
      paddingLeft: theme.spacing(4),
      '& li': { // This will target list items
        // color: liColor,
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(1),
      }
    },
  };
});
