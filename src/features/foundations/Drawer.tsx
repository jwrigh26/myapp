import List from "@mui/material/List";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { PermanentDrawer } from "components/Drawer";
import Icon from "components/Icon";
import { forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router";
import { isString } from "utils/safety";
import "./index.css";
// import Collapse from '@mui/material/Collapse';

export function Drawer() {
  return (
    <PermanentDrawer>
      <ToolbarSpacer />
      <StyledList>
        <NavButton to="/foundations" level={0} isIndex={true}>
          <ListItemText primary="Getting Started" />
        </NavButton>
        <NavButton to="/foundataions/math" level={1} isIndex={true}>
          <ListItemText primary="Math" />
        </NavButton>
        <NavButton
          to="/foundations/math/asymptotic-notation"
          level={2}
          isRoute={true}
        >
          <ListItemText primary="asymptotic-notation" />
        </NavButton>
        <NavButton
          to="/foundations/math/modular-arithmetic"
          level={2}
          isRoute={true}
        >
          <ListItemText primary="modular-arithmetic" />
        </NavButton>
        <NavButton
          to="/foundations/math/complexity-analysis"
          level={2}
          isRoute={true}
        >
          <ListItemText primary="complexity-analysis" />
        </NavButton>
        {/* Recursion */}
        <NavButton to="/foundations/recursion" level={0} isIndex={true}>
          <ListItemText primary="Recursion" />
        </NavButton>
        {/* Basics */}
        <NavButton to="/foundations/recursion/basics" level={1} isPrefix={true}>
          <ListItemText primary="Basics" />
        </NavButton>
        <NavButton
          to="/foundations/recursion/basics/backtracking"
          level={2}
          isRoute={true}
        >
          <ListItemText primary="backtracking" />
        </NavButton>
        <NavButton
          to="/foundations/recursion/basics/divide-and-conquer"
          level={2}
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

const NavButton = styled(
  forwardRef<HTMLAnchorElement, NavButtonProps>(
    (
      { to, level = 0, isIndex = false, isPrefix = false, className, ...props },
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
      prop !== "level" &&
      prop !== "isRoute" &&
      prop !== "isPrefix" &&
      prop !== "isIndex",
  }
)<NavButtonProps>(({ theme, level = 0, isIndex, isPrefix, isRoute }) => ({
  ...theme.typography.body1,
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2 + level),
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  // # isIndex
  ...(isIndex && {
    backgroundColor: theme.palette.background.paper,
    cursor: "default",
    "& .MuiListItemText-root > span": {
      // ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
    },
  }),
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
    backgroundColor: "inherit",
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
    "&.active": {
      color: "red",
      cursor: "default",
      pointerEvents: "none",
      "& span": {},
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }),
}));

const RotateIcon = styled(Icon, {
  shouldForwardProp: (prop) => prop !== "rotate",
})<{ rotate: number }>(({ theme, rotate }) => ({
  color: theme.palette.text.secondary,
  transform: rotate ? "rotate(90deg)" : "rotate(180deg)",
  trnasition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);
