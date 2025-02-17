import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { mdiCheck } from "@mdi/js";
import Icon from "components/Icon";

export interface WidgetFiltersProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  selectedIndex: number;
  options: string[];
  onClose: () => void;
  onSelect: (index: number) => void;
}

export default function WidgetFilters({
  anchorEl,
  open,
  onClose,
  selectedIndex,
  options,
  onSelect,
}: WidgetFiltersProps) {
  return (
    <Menu
      id="widget-filters-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "widget-filters-button",
        role: "listbox",
      }}
    >
      {options.map((option, index) => (
        <MenuItem
          key={option}
          // disabled={index === 0}
          selected={index === selectedIndex}
          onClick={() => onSelect(index)}
        >
          <Stack direction="row" alignItems="center" gap={2}>
            {index === selectedIndex && <Icon path={mdiCheck} />}
            {index !== selectedIndex && <MenuIconSpacer />}
            {option}
          </Stack>
        </MenuItem>
      ))}
    </Menu>
  );
}

// ################################################
// ### Widget Sub Components
// ################################################

function MenuIconSpacer() {
  return <div style={{ width: 24 }} />;
}