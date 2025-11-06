/**
 * Binary Search Drawer Footer
 * 
 * Custom footer displayed at the bottom of the SecondaryDrawer
 * for the binary search lesson.
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto', // Push to bottom of drawer
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export function BinarySearchDrawerFooter() {
  return (
    <FooterContainer>
      <Typography variant="caption" fontWeight={600} color="text.secondary">
        Binary Search Visualizer
      </Typography>
      <Typography variant="caption" display="block" color="text.disabled">
        Interactive learning module
      </Typography>
    </FooterContainer>
  );
}

export default BinarySearchDrawerFooter;
