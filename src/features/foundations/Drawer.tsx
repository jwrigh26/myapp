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
import { RouteItem, RouteType } from "src/routes";
import { isString } from "utils/safety";
import "./index.css";
import { foundationRoutes } from "./navigation";

export function Drawer() {
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((prev) => !prev);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
  };

  /**
   * Loop through each route
   * - If it's an index route, create an IndexListItem
   * - If it's a prefix route, create a PrefixListItem
   * - If it's a route, create a RouteListItem
   */

  return (
    <PermanentDrawer>
      <ToolbarSpacer />
      <StyledList>
        {foundationRoutes.map((route) => {
          return <IndexListItem key={route.path} route={route} />;
        })}
      </StyledList>
    </PermanentDrawer>
  );
}

// ################################################
// ### Components
// ################################################

function IndexListItem({ route }: { route: RouteItem }) {
  const { text, children } = route;

  // const defaultOpen = route.path === "/foundations";

  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((prev) => !prev);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
    console.log(children);
  };
  return (
    <>
      <ToggleButton onClick={handleClick} level={0}>
        <ListItemText primary={text} />
        <RotateIcon
          rotate={open ? 1 : 0}
          path={mdiChevronRight}
          color="primary"
        />
      </ToggleButton>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children.map((child) => (
            <RouteListItem key={child.path} route={child} />
          ))}
        </Collapse>
      )}
    </>
  );
}

function RouteListItem({ route }: { route: RouteItem }) {
  const { path, text, level, type } = route;
  const isRoute = type === RouteType.Route || !type;

  return (
    <NavButton
      to={path}
      level={level}
      isPrefix={type === RouteType.Prefix}
      isRoute={isRoute}
    >
      <ListItemText primary={text} />
    </NavButton>
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
  marginBottom: 48, // 48px current desktop footer height
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
      ...theme.typography.subtitle1,
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
      ...theme.typography.subtitle2,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
  // # isRoute
  ...(isRoute && {
    "& .MuiListItemText-root > span": {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.primary,
    },
    "&.active": {
      cursor: "default",
      pointerEvents: "none",
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
