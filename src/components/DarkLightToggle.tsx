import { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { mdiThemeLightDark } from "@mdi/js";
import Icon from "components/Icon";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "src/ThemeProvider";

export default function DarkLightToggle() {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  const color = isDarkMode ? theme.palette.primary.light: theme.palette.primary.light;
  const backgroundColor = isDarkMode ? theme.palette.secondary.dark : theme.palette.primary.dark;

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
      // sx={{ borderColor: color }}
    >
      <Icon path={mdiThemeLightDark} fontSize="small" />
    </ToggleButton>
  );
}
