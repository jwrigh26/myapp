import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

interface ProseListProps {
  /** Array of list items. These can be text, inline elements, or even JSX. */
  items: React.ReactNode[];
  /** Determines whether the list is ordered (numbered) or unordered (bulleted). */
  ordered?: boolean;
  /** If true, applies a more compact padding. */
  dense?: boolean;
  /** Adds extra spacing at the top if true. */
  spacingTop?: boolean;
  /** Adds extra spacing at the bottom if true. */
  spacingBottom?: boolean;
  /**
   * Options to override default typography variants or component types.
   */
  options?: {
    itemVariant?: 'body1' | 'body2' | 'caption' | 'overline';
    listComponent?: React.ElementType;
    itemComponent?: React.ElementType;
  };
  indentLevel?: number;
  subTitle?: string;
  /** Color for the list items. */
  color?: string;
}

function ProseList({
  items,
  ordered = false,
  dense = false,
  spacingTop = false,
  spacingBottom = false,
  indentLevel = 1,
  options = {},
  subTitle,
  color = 'primary.main',
}: ProseListProps): JSX.Element {
  const {
    itemVariant = 'body1',
    listComponent = ordered ? 'ol' : 'ul',
    itemComponent = 'li',
  } = options;

  return (
    <>
      {subTitle && (
        <Typography
          variant="h6"
          component="h6"
          color={color}
          gutterBottom={true}
          sx={{ ml: 0 }}
        >
          {subTitle}
        </Typography>
      )}
      <StyledList
        dense={dense}
        spacingTop={spacingTop}
        spacingBottom={spacingBottom}
        ordered={ordered}
        component={listComponent}
        indentLevel={indentLevel}
        color={color}
      >
        {items.map((item, index) => (
          <Typography
            key={index}
            variant={itemVariant}
            component={itemComponent}
            color="textPrimary"
          >
            {item}
          </Typography>
        ))}
      </StyledList>
    </>
  );
}

export default ProseList;

interface StyledListProps extends BoxProps {
  dense: boolean;
  spacingTop?: boolean;
  spacingBottom?: boolean;
  ordered: boolean;
  indentLevel?: number;
  color?: string;
}

const getPaletteColor = (theme: any, color: string) => {
  // Only handle palette colors in the form "primary.main"
  const [section, shade] = color.split('.');
  if (
    section &&
    shade &&
    theme.palette[section] &&
    theme.palette[section][shade]
  ) {
    return theme.palette[section][shade];
  }
  // Fallback to the color string itself (e.g. "#123456" or "red")
  return color;
};

const StyledList = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'dense' &&
    prop !== 'spacingTop' &&
    prop !== 'spacingBottom' &&
    prop !== 'ordered' &&
    prop !== 'indentLevel' &&
    prop !== 'color',
})<StyledListProps>(({
  theme,
  dense = false,
  spacingTop = false,
  spacingBottom = false,
  ordered,
  indentLevel = 1,
  color = 'primary.main',
}) => {
  const paddingTopStyle = spacingTop ? { paddingTop: theme.spacing(2) } : {};
  const paddingBottomStyle = spacingBottom
    ? { paddingBottom: theme.spacing(2) }
    : {};

  return {
    margin: 0,
    paddingLeft: theme.spacing(1 + indentLevel * 2),
    listStyleType: ordered ? 'decimal' : 'disc',
    ...paddingTopStyle,
    ...paddingBottomStyle,
    '& li': {
      marginBottom: theme.spacing(1),
      '&: :marker': {
        color: getPaletteColor(theme, color),
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
    '& span.name-alt, & span.bold-alt': {
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
