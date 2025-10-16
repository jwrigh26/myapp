import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

interface CodeAnswerProps {
  children: ReactNode;
  subtitle?: string;
  gutterBottom?: boolean;
}

const StyledAnswerBox = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(2),
    border: '2px solid',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    whiteSpace: 'pre-wrap',
  };
});

export default function CodeAnswer({
  children,
  subtitle,
  gutterBottom = true,
}: CodeAnswerProps) {
  return (
    <StyledAnswerBox>
      {subtitle && (
        <Typography
          variant="subtitle2"
          color="secondary.main"
          component="h3"
          gutterBottom={gutterBottom}
        >
          {subtitle}
        </Typography>
      )}
      {children}
    </StyledAnswerBox>
  );
}
