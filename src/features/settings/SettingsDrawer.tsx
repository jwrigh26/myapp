import { DrawerHeader, Sheet, TemporaryDrawer } from "components/Drawer";
import { useDrawer } from "hooks/useContext";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import DarkLightToggle from "components/DarkLightToggle";
import Stack from "@mui/material/Stack";
import { mdiCog } from "@mdi/js";

// ################################################
// ### SettingsDrawer
// ################################################

export default function SettingsDrawer() {
  const { isOpen, closeDrawer } = useDrawer("settings-drawer");

  return (
    <TemporaryDrawer anchor="right" open={isOpen} onClose={closeDrawer}>
      <DrawerHeader icon={mdiCog} title="Settings" onClose={closeDrawer} />
      <Sheet>
        <List>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1">Dark Mode:</Typography>
            <DarkLightToggle />
          </Stack>
        </List>
      </Sheet>
    </TemporaryDrawer>
  );
}
