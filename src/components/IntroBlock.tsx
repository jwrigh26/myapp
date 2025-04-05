import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';

interface IntroBlockProps {
  /** A hook paragraph to engage the reader. */
  hook?: string;
  /** Custom content can be passed as children instead of hook text. */
  children?: React.ReactNode;
}

const IntroBlock: React.FC<IntroBlockProps> = ({ hook, children }) => {
  return (
    <StyledIntroBlock>
      {children ? (
        <Typography variant="body1" component="p" gutterBottom>
          {children}
        </Typography>
      ) : (
        hook && (
          <Typography variant="body1" component="p" gutterBottom>
            {hook}
          </Typography>
        )
      )}
    </StyledIntroBlock>
  );
};

export default IntroBlock;

const StyledIntroBlock = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(2, 0),
  marginBottom: 0,
  borderTop: `3px solid ${theme.palette.primary.main}`,
  '& p': {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
  },
}));
