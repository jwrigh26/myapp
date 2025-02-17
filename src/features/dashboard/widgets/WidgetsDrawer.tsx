import { mdiWidgetsOutline } from "@mdi/js";
import { DrawerHeader, Sheet, TemporaryDrawer } from "components/Drawer";
import { useDrawer } from "hooks/useContext";
import { lazy, Suspense } from "react";

const WidgetList = lazy(() => import("./WidgetList"));

// ################################################
// ### SettingsDrawer
// ################################################

export default function WidgetsDrawer() {
  const { isOpen, closeDrawer } = useDrawer("widgets-drawer");

  return (
    <TemporaryDrawer anchor="right" open={isOpen} onClose={closeDrawer}>
      <DrawerHeader
        icon={mdiWidgetsOutline}
        title="Widgets"
        onClose={closeDrawer}
      />
      <Sheet>
        <Suspense fallback={<div>Loading widgets…</div>}>
          <WidgetList />
        </Suspense>
      </Sheet>
    </TemporaryDrawer>
  );
}
