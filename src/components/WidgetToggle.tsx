import { mdiWidgetsOutline } from "@mdi/js";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import Icon from "components/Icon";
import { useComponentStateContext } from "context/ComponentStateContext";
import { useThemeMode } from "src/ThemeProvider";

export default function WidgetToggle() {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error(
      "useComponentStateContext must be used within a ComponentStateProvider"
    );
  }
  const { open, toggleOpen } = context;

  const { isDarkMode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  const color = theme.palette.primary.light;

  const drawerId = "widgetDrawer";

  // if (open[drawerId]) {
  //   console.log("Widget drawer is open");
  // }else{
  //   console.log("Widget drawer is closed");
  // }

  return (
    <ToggleButton
      value="widgets"
      selected={open[drawerId] || false}
      onChange={toggleOpen(drawerId)}
      size="small"
      sx={{ color }}
      // htmlColor={color}
    >
      <Icon path={mdiWidgetsOutline} fontSize="small" />
    </ToggleButton>
  );
}
