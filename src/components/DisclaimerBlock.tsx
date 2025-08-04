import Icon from '@/components/Icon';
import { mdiMessageAlert } from '@mdi/js';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';

interface DisclaimerBlockProps {
  /** Title for the disclaimer (e.g. "Development Disclaimer") */
  title?: string;
  /** The disclaimer message content */
  children?: React.ReactNode;
}

const DisclaimerBlock: React.FC<DisclaimerBlockProps> = ({
  title,
  children,
}) => {
  return (
    <StyledDisclaimerBlock>
      {title && (
        <Stack direction="row" gap={1} alignItems={'center'}>
          <Icon path={mdiMessageAlert} color="secondary" fontSize="small" />
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
        </Stack>
      )}
      {children && (
        <Typography variant="body1" component="p">
          {children}
        </Typography>
      )}
    </StyledDisclaimerBlock>
  );
};

export default DisclaimerBlock;

const StyledDisclaimerBlock = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: theme.shape.borderRadius,
  '& h2': {
    color: theme.palette.secondary.main,
  },
  '& p': {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
  },
}));
