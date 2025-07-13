import Box from '@mui/material/Box';
import ProseBlock from '@/components/ProseBlock';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

interface NoteBlockProps {
  children: ReactNode;
  title?: string;
  variant?: 'default' | 'info' | 'warning' | 'error';
}

const StyledNoteBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: NoteBlockProps['variant'] }>(({ theme, variant = 'default' }) => {
  const variantStyles = {
    default: {
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.paper,
    },
    info: {
      borderColor: theme.palette.info.main,
      backgroundColor: theme.palette.info.light + '20',
    },
    warning: {
      borderColor: theme.palette.warning.main,
      backgroundColor: theme.palette.warning.light + '20',
    },
    error: {
      borderColor: theme.palette.error.main,
      backgroundColor: theme.palette.error.light + '20',
    },
  };

  return {
    padding: theme.spacing(2),
    border: '2px solid',
    borderRadius: theme.shape.borderRadius,
    ...variantStyles[variant],
  };
});

export default function NoteBlock({
  children,
  title = 'Note:',
  variant = 'default',
}: NoteBlockProps) {
  return (
    <StyledNoteBox variant={variant}>
      <ProseBlock
        subtitle={title}
        options={{ subtitleVariant: 'subtitle2', textVariant: 'body2' }}
        backgroundColor="transparent"
      >
        {children}
      </ProseBlock>
    </StyledNoteBox>
  );
}
