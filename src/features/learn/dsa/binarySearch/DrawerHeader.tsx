import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@/components/Icon';
import { styled } from '@mui/material/styles';
import { mdiRabbit } from '@mdi/js';

const HeaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export function BinarySearchDrawerHeader() {
  return (
    <HeaderContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Icon path={mdiRabbit} fontSize="small" />
        <Typography variant="caption" fontWeight={600} color="primary">
          Binary Search
        </Typography>
      </Box>
      <Typography variant="caption" display="block" color="text.secondary">
        Find the honey bunny
      </Typography>
    </HeaderContainer>
  );
}

export default BinarySearchDrawerHeader;
