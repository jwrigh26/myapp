import { mdiWidgetsOutline } from "@mdi/js";
import { styled } from "@mui/material/styles";
import MUIToggleButton from "@mui/material/ToggleButton";
import Icon from "components/Icon";
// import { useComponentStateContext } from "context/ComponentStateContext";
// import { useThemeMode } from "src/ThemeProvider";

interface ToggleButtonProps {
  icon: string;
  onChange: () => void;
  selected: boolean;
  value: string;
}

export default function ToggleButton({ icon, onChange: handleChange, selected: isSeleted, value="defaultValue" }: ToggleButtonProps) {
  // const context = useComponentStateContext();
  // if (!context) {
  //   throw new Error(
  //     "useComponentStateContext must be used within a ComponentStateProvider"
  //   );
  // }
  // const { open, toggleOpen } = context;

  // const { isDarkMode, toggleTheme } = useThemeMode();
  // const theme = useTheme();


  // const drawerId = "widgetDrawer";

  // if (open[drawerId]) {
  //   console.log("Widget drawer is open");
  // }else{
  //   console.log("Widget drawer is closed");
  // }

  return (
    <StyledToggleButton
      value={value}
      color="primary"
      onChange={handleChange}
      selected={isSeleted}
      // selected={open[drawerId] || false}
      size="small"
    >
      <Icon path={icon} fontSize="small" />
    </StyledToggleButton>
  );
}

const StyledToggleButton = styled(MUIToggleButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
  '&:hover': {
    borderColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.dark,
  },
}));