import ToggleButton from "@mui/material/ToggleButton";
import { mdiWidgetsOutline } from "@mdi/js";
import Icon from "components/Icon";
import { useTheme } from "@mui/material/styles";
import { useComponentStateContext } from "context/ComponentStateContext";

export default function WidgetToggle() {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error(
      "useComponentStateContext must be used within a ComponentStateProvider"
    );
  }
  const { open, toggleOpen } = context;
  const theme = useTheme();

  // const color = theme.palette.primary.light;
  // const backgroundColor = theme.palette.primary.dark;
  const drawerId = "widgetDrawer";

  if (open[drawerId]) {
    console.log("Widget drawer is open");
  }else{
    console.log("Widget drawer is closed");
  }

  return (
    <ToggleButton
      value="widgets"
      selected={open[drawerId] || false}
      onChange={toggleOpen(drawerId)}
      size="small"
      // sx={{ borderColor: color, backgroundColor }}
      // htmlColor={color} 
    >
      <Icon path={mdiWidgetsOutline} fontSize="small" />
    </ToggleButton>
  );
}
