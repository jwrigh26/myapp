import { mdiThemeLightDark } from "@mdi/js";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import Icon from "components/Icon";
import { useEffect } from "react";
import { useThemeMode } from "src/ThemeProvider";

export default function DarkLightToggle() {
  const { toggleTheme } = useThemeMode();
  const theme = useTheme();

  console.log("DarkLightToggle");

  const color = theme.palette.primary.light;

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleToggle = () => {
    const newMode = theme.palette.mode ? "light" : "dark";
    localStorage.setItem("themeMode", newMode);
    document.documentElement.setAttribute("data-theme", newMode);
    toggleTheme();
  };

  return (
    <ToggleButton
      value="theme"
      selected={theme.palette.mode === "dark"}
      onChange={handleToggle}
      size="small"
      sx={{ color: color }}
    >
      <Icon path={mdiThemeLightDark} fontSize="small" />
    </ToggleButton>
  );
}
