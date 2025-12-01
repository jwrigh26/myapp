/**
 * Binary Search Drawer Footer
 * 
 * Custom footer displayed at the bottom of the SecondaryDrawer
 * for the binary search lesson.
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto', // Push to bottom of drawer
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

// Toggle control uses the global component state context so pages can react
// to toggle changes via `useToggle(key)` in `src/hooks/useContext.ts`.
import { useToggle } from '@/hooks/useContext';

export function BinarySearchDrawerFooter() {
  // Use a shared key for this page so the page can listen to changes
  const { isOpen: showCode, toggleOpen } = useToggle('binary-search.showCode');

  return (
    <FooterContainer>
      <Typography variant="caption" fontWeight={600} color="text.secondary">
        Binary Search Visualizer
      </Typography>
      <Typography variant="caption" display="block" color="text.disabled">
        Interactive learning module
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Button size="small" variant="outlined" onClick={toggleOpen}>
          {showCode ? 'Hide code' : 'Show code'}
        </Button>
      </Box>
    </FooterContainer>
  );
}

export default BinarySearchDrawerFooter;
