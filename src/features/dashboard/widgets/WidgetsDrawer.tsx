import { mdiWidgetsOutline } from "@mdi/js";
import { mdiFilterVariant } from "@mdi/js";
import { mdiPencil } from '@mdi/js';
import { DrawerHeader, Sheet, TemporaryDrawer } from "components/Drawer";
import { useDrawer } from "hooks/useContext";
import { useState, lazy, Suspense } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ToggleButton from "components/ToggleButton";
import WidgetFilters from "./WidgetFilters";

const WidgetList = lazy(() => import("./WidgetList"));

// Options for the filter menu
const filterOptions = ["All", "Active", "Inactive"];

// ################################################
// ### SettingsDrawer
// ################################################

export default function WidgetsDrawer() {
  const { isOpen, closeDrawer } = useDrawer("widgets-drawer");

  const [editing, setEditing] = useState(false);

  const {
    anchorEl: filterAnchorEl,
    open: filterOpen,
    selectedIndex: filterSelectedIndex,
    openFilterMenu,
    closeFilterMenu,
    handleFilterSelect,
  } = useWidgetFilters();


  return (
    <TemporaryDrawer anchor="right" open={isOpen} onClose={closeDrawer}>
      <DrawerHeader
        icon={mdiWidgetsOutline}
        title="Widgets"
        onClose={closeDrawer}
      />
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Toolbar disableGutters variant="dense">
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={1}
            width="100%"
            sx={{ padding: 1, paddingRight: 2 }}
          >
            <ToggleButton
              icon={mdiFilterVariant}
              onChange={openFilterMenu}
              selected={filterOpen}
              value="filter"
            />
            <ToggleButton
              icon={mdiPencil}
              onChange={() => { setEditing(!editing) }}
              selected={editing}
              value="search"
              color="primary"
            />
          </Box>
        </Toolbar>
      </AppBar>
      <WidgetFilters
        anchorEl={filterAnchorEl}
        open={filterOpen}
        onClose={closeFilterMenu}
        selectedIndex={filterSelectedIndex}
        options={filterOptions}
        onSelect={handleFilterSelect}
      />
      <Sheet>
        <Suspense fallback={<div>Loading widgets…</div>}>
          <WidgetList />
        </Suspense>
      </Sheet>
    </TemporaryDrawer>
  );
}


// ################################################
// ### Widget Hooks
// ################################################

function useWidgetFilters() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  const openFilterMenu = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (index: number) => {
    setSelectedIndex(index);
    closeFilterMenu();
  };

  return {
    anchorEl,
    open,
    selectedIndex,
    openFilterMenu,
    closeFilterMenu,
    handleFilterSelect,
  };
}