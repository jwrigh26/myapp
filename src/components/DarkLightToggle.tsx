import { mdiThemeLightDark } from "@mdi/js";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import Icon from "components/Icon";
import { useEffect } from "react";
import { useThemeMode } from "src/ThemeProvider";

export default function DarkLightToggle() {
  const { isDarkMode, toggleTheme } = useThemeMode();
  console.log("isDarkMode", isDarkMode);
  const theme = useTheme();

  const color = theme.palette.primary.light;

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleToggle = () => {
    const newMode = isDarkMode ? "light" : "dark";
    localStorage.setItem("themeMode", newMode);
    document.documentElement.setAttribute("data-theme", newMode);
    toggleTheme();
  };

  return (
    <ToggleButton
      value="theme"
      selected={isDarkMode}
      onChange={handleToggle}
      size="small"
      sx={{ color: color }}
    >
      <Icon path={mdiThemeLightDark} fontSize="small" />
    </ToggleButton>
  );
}
