import { mdiChevronRight } from "@mdi/js";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { PermanentDrawer } from "components/Drawer";
import Icon from "components/Icon";
import { forwardRef, useState } from "react";
import { NavLink, NavLinkProps } from "react-router";
import { isString } from "utils/safety";
import "./index.css";

export function Drawer() {
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((prev) => !prev);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
  };

  // So for looping we need a

  return (
    <PermanentDrawer>
      <ToolbarSpacer />
      <StyledList>
        {/* If index */}
        <ToggleButton onClick={handleClick} level={0}>
          <ListItemText primary="Math" />
          <RotateIcon
            rotate={open ? 1 : 0}
            path={mdiChevronRight}
            color="primary"
          />
        </ToggleButton>
        <Collapse in={open} timeout="auto">
          <NavButton
            to="/foundations/math/asymptotic-notation"
            level={1}
            isRoute
          >
            <ListItemText primary="asymptotic-notation" />
          </NavButton>
          <NavButton
            to="/foundations/math/modular-arithmetic"
            level={1}
            isRoute
          >
            <ListItemText primary="modular-arithmetic" />
          </NavButton>
          <NavButton
            to="/foundations/math/complexity-analysis"
            level={1}
            isRoute
          >
            <ListItemText primary="complexity-analysis" />
          </NavButton>
        </Collapse>
        {/* Recursion */}
        <NavButton to="/foundations/recursion" level={0} isIndex={true}>
          <ListItemText primary="Recursion" />
        </NavButton>
        {/* Basics */}
        <NavButton to="/foundations/recursion/basics" level={0} isPrefix={true}>
          <ListItemText primary="Basics" />
        </NavButton>
        <NavButton
          to="/foundations/recursion/basics/backtracking"
          level={1}
          isRoute={true}
        >
          <ListItemText primary="backtracking" />
        </NavButton>
        <NavButton
          to="/foundations/recursion/basics/divide-and-conquer"
          level={1}
          isRoute={true}
        >
          <ListItemText primary="divide-and-conquer" />
        </NavButton>
      </StyledList>
    </PermanentDrawer>
  );
}

// ################################################
// ### Styles
// ################################################

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  paddingTop: 0,
  paddingBottom: theme.spacing(2),
}));

type NavButtonProps = Omit<ListItemButtonProps, "href" | "className"> &
  NavLinkProps & {
    level?: number;
    isIndex?: boolean;
    isPrefix?: boolean;
    isRoute?: boolean;
  };

const ToggleButton = styled(ListItemButton)<{ level: number }>(
  ({ theme, level }) => ({
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2 + level),
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiListItemText-root > span": {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
  })
);

const NavButton = styled(
  forwardRef<HTMLAnchorElement, NavButtonProps>(
    (
      { to, level = 0, isPrefix = false, isRoute = true, className, ...props },
      ref
    ) => (
      <ListItemButton
        {...props}
        className={isString(className) ? className : ""}
        component={NavLink}
        to={to}
        ref={ref}
      />
    )
  ),
  {
    shouldForwardProp: (prop: PropertyKey) =>
      prop !== "level" && prop !== "isRoute" && prop !== "isPrefix",
  }
)<NavButtonProps>(({ theme, level = 0, isPrefix, isRoute }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2 + level),
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  // # isPrefix
  ...(isPrefix && {
    borderBottom: `1px solid ${theme.palette.divider}`,
    cursor: "default",
    pointerEvents: "none",
    backgroundColor: "inherit",
    "& .MuiListItemText-root > span": {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
  // # isRoute
  ...(isRoute && {
    // color: theme.palette.text.secondary,
    //
    "& .MuiListItemText-root > span": {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.primary,
    },
    "&.active": {
      color: theme.palette.secondary.main,
      cursor: "default",
      pointerEvents: "none",
      // "& span": {},
      "& .MuiListItemText-root > span": {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        textDecoration: "underline",
        textDecorationThickness: "2px",
        textUnderlineOffset: "4px", // Increase this value to increase the padding between the underline and text
      },
    },
  }),
}));

const RotateIcon = styled(Icon, {
  shouldForwardProp: (prop) => prop !== "rotate",
})<{ rotate: number }>(({ theme, rotate }) => ({
  transform: rotate ? "rotate(90deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);
