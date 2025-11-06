import Box from '@mui/material/Box';
import { ReactNode } from 'react';

interface BlogPostGridProps {
  children: ReactNode;
}

export function BlogPostGrid({ children }: BlogPostGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 4,
        alignItems: 'stretch',
      }}
    >
      {children}
    </Box>
  );
}
