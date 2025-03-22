import DarkModeToggle from '@/components/DarkModeToggle';
import { DrawerHeader, Sheet, TemporaryDrawer } from '@/components/Drawer';
import { useDrawer } from '@/hooks/useContext';
import { mdiCog } from '@mdi/js';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// ################################################
// ### SettingsDrawer
// ################################################

export function SettingsDrawer({ desktop }: { desktop: boolean }) {
  const { isOpen, closeDrawer } = useDrawer('settings-drawer');

  return (
    <TemporaryDrawer anchor="right" open={isOpen} onClose={closeDrawer}>
      {/* {desktop && <ToolbarSpacer />} */}
      <DrawerHeader icon={mdiCog} title="Settings" onClose={closeDrawer} />
      <Sheet>
        <List>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1">Dark Mode:</Typography>
            <DarkModeToggle />
          </Stack>
        </List>
      </Sheet>
    </TemporaryDrawer>
  );
}

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);
