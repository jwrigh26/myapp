import ToggleButton from "components/ToggleButton";
import { useLocation } from "react-router";
import { mdiWidgetsOutline } from "@mdi/js";
import { useDrawer } from "hooks/useContext";

export default function Actions() {
  const location = useLocation();
  const { pathname } = location;

  if (pathname === "/dashboard") {
    return <DashboardActions />;
  }

  return null;
}

function DashboardActions() {
  const { isOpen, openDrawer } = useDrawer("widgets-drawer");
  return (
    <>
      <ToggleButton
        icon={mdiWidgetsOutline}
        onChange={openDrawer}
        selected={isOpen}
        value="widgets"
      />
    </>
  );
}
