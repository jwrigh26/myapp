import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';

interface QuoteBlockProps {
  /** A hook paragraph to engage the reader. */
  hook?: string;
  /** Custom content can be passed as children. If string, will be wrapped in Typography. If ReactNode, renders as-is. */
  children?: React.ReactNode | string;
  /** Use secondary color instead of primary for the border. */
  secondary?: boolean;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  hook,
  children,
  secondary = false,
}) => {
  const renderContent = () => {
    if (children) {
      // If children is a string, wrap it in Typography
      if (typeof children === 'string') {
        return (
          <Typography variant="body1" component="p" gutterBottom>
            {children}
          </Typography>
        );
      }
      // If children is ReactNode, render as-is
      return children;
    }

    // Fallback to hook if no children
    if (hook) {
      return (
        <Typography variant="body1" component="p" gutterBottom>
          {hook}
        </Typography>
      );
    }

    return null;
  };

  return (
    <StyledIntroBlock secondary={secondary}>{renderContent()}</StyledIntroBlock>
  );
};

export default QuoteBlock;

interface StyledIntroBlockProps extends BoxProps {
  secondary?: boolean;
}

const StyledIntroBlock = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'secondary',
})<StyledIntroBlockProps>(({ theme, secondary }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderLeft: `4px solid ${secondary ? theme.palette.secondary.main : theme.palette.primary.main}`,
  marginBottom: theme.spacing(2),
  '& p': {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    fontStyle: 'italic',
  },
}));
