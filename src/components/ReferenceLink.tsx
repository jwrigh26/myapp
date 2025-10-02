import Icon from '@/components/Icon';
import { mdiOpenInNew } from '@mdi/js';
import Box, { BoxProps } from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface ReferenceLinkProps {
  /**
   * The full text to display
   */
  text: string;
  /**
   * The URL to link to
   */
  url: string;
  /**
   * The text portion that should be linked (defaults to the full text)
   * If not provided, the entire text will be a link
   */
  linkText?: string;
  /**
   * Whether to display the component in a more compact style
   */
  dense?: boolean;
  /**
   * Whether to add bottom spacing
   */
  spacingBottom?: boolean;
  /**
   * Additional styling options
   */
  options?: {
    textVariant?: 'body1' | 'body2' | 'caption' | 'subtitle1' | 'subtitle2';
    textComponent?: React.ElementType;
    showIcon?: boolean;
    iconSize?: 'small' | 'medium' | 'large';
  };
}

function ReferenceLink({
  text,
  url,
  linkText,
  dense = false,
  spacingBottom = false,
  options = {},
}: ReferenceLinkProps): JSX.Element {
  const {
    textVariant = 'body2',
    textComponent = 'div',
    showIcon = true,
    iconSize = 'small',
  } = options;

  // If linkText is not provided, make the entire text a link
  if (!linkText) {
    return (
      <StyledReference dense={dense} spacingBottom={spacingBottom}>
        <Typography
          variant={textVariant}
          component={textComponent}
          color="text.secondary"
          sx={{ fontStyle: 'italic', color: 'red' }}
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {text}
            {showIcon && (
              <Icon
                path={mdiOpenInNew}
                fontSize={iconSize}
                sx={{
                  color: 'red',
                  ml: 0.5,
                  width: '0.9em',
                  height: '0.9em',
                }}
              />
            )}
          </Link>
        </Typography>
      </StyledReference>
    );
  }

  // If linkText is provided, only link that portion
  const parts = text.split(linkText);
  console.log('text', text);
  console.log("Link", linkText);
  console.log('parts', parts);

  // If the linkText isn't found in the text, fall back to making the entire text a link
  if (parts.length === 1) {
    return (
      <StyledReference dense={dense} spacingBottom={spacingBottom}>
        <Typography
          variant={textVariant}
          component={textComponent}
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {text}
            {showIcon && (
              <Icon
                path={mdiOpenInNew}
                fontSize={iconSize}
                sx={{ ml: 0.5, width: '0.9em', height: '0.9em', color: 'red' }}
              />
            )}
          </Link>
        </Typography>
      </StyledReference>
    );
  }

  return (
    <StyledReference dense={dense} spacingBottom={spacingBottom}>
      <Typography
        variant={textVariant}
        component={textComponent}
        color="text.secondary"
        sx={{ fontStyle: 'italic' }}
      >
        {parts[0]}
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'secondary.main',
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            borderBottom: '1px solid',
            borderColor: 'secondary.main',
          }}
        >
          {linkText}
          {showIcon && (
            <Icon
              path={mdiOpenInNew}
              fontSize={iconSize}
              sx={{
                ml: 0.5,
                width: '0.9em',
                height: '0.9em',
                color: 'secondary.main',
              }}
            />
          )}
        </Link>
        {parts[1]}
      </Typography>
    </StyledReference>
  );
}

export default ReferenceLink;

//####################################
//### Styles
//####################################

interface StyledReferenceProps extends BoxProps {
  dense: boolean;
  spacingBottom?: boolean;
}

const StyledReference = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dense' && prop !== 'spacingBottom',
})<StyledReferenceProps>(({ theme, dense, spacingBottom }) => {
  const paddingStyles = dense
    ? { padding: theme.spacing(0, 2) }
    : { padding: theme.spacing(1, 2) };

  const spacingBottomStyles = spacingBottom
    ? { marginBottom: theme.spacing(3) }
    : { marginBottom: theme.spacing(1) };

  return {
    borderLeft: `4px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    ...paddingStyles,
    ...spacingBottomStyles,
  };
});
