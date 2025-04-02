import DarkModeToggle from '@/components/DarkModeToggle';
import { MobileDrawer, Sheet } from '@/components/Drawer';
import { useDrawer } from '@/hooks/useContext';
import { mdiArrowLeft } from '@mdi/js';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from './Icon';

// ################################################
// ### NavigationDrawer
// ################################################

export function NavigationDrawer({ desktop }: { desktop: boolean }) {
  const { isOpen, closeDrawer } = useDrawer('navigation-drawer');
  const anchorPosition = 'left';

  if (desktop) {
    return null; // Don't render the drawer on desktop
  }

  return (
    <MobileDrawer anchor={anchorPosition} open={isOpen} onClose={closeDrawer}>
      <DrawerHeader />
      <Sheet>
        <List>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1">Dark Mode:</Typography>
            <DarkModeToggle />
          </Stack>
        </List>
      </Sheet>
    </MobileDrawer>
  );
}

function DrawerHeader() {
  const { isOpen, closeDrawer } = useDrawer('navigation-drawer');
  const theme = useTheme();
  const title = 'JW';

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing(1),
          backgroundColor: theme.palette.background.paper,
          '& *': {
            userSelect: 'none',
          },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={closeDrawer}>
            <Icon fontSize="medium" path={mdiArrowLeft} />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Stack>
      </Box>
    </>
  );
}
