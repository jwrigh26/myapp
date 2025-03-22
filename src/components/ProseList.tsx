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
}

function ProseList({
  items,
  ordered = false,
  dense = false,
  spacingBottom = false,
  indentLevel = 1,
  options = {},
  subTitle,
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
          color="textPrimary"
          gutterBottom={false}
          sx={{ ml: 2, color: 'primary.main' }}
        >
          {subTitle}
        </Typography>
      )}
      <StyledList
        dense={dense}
        spacingBottom={spacingBottom}
        ordered={ordered}
        component={listComponent}
        indentLevel={indentLevel}
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
  spacingBottom?: boolean;
  ordered: boolean;
  indentLevel?: number;
}

const StyledList = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'dense' &&
    prop !== 'spacingBottom' &&
    prop !== 'ordered' &&
    prop !== 'indentLevel',
})<StyledListProps>(({
  theme,
  dense = false,
  spacingBottom,
  ordered,
  indentLevel = 1,
}) => {
  // const paddingStyles = dense
  //   ? { padding: theme.spacing(0, 2), paddingBottom: theme.spacing(2) }
  //   : { padding: theme.spacing(2, 2) };

  const spacingBottomStyles = spacingBottom
    ? { paddingBottom: theme.spacing(2) }
    : {};

  return {
    margin: 0,
    paddingLeft: theme.spacing(2 + indentLevel * 2),
    // ...paddingStyles,
    ...spacingBottomStyles,
    listStyleType: ordered ? 'decimal' : 'disc',
    '& li': {
      marginBottom: theme.spacing(1),
      '&: :marker': {
        color: theme.palette.primary.main,
      },
    },
  };
});
