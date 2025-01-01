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
import "./index.css";
// import Collapse from '@mui/material/Collapse';

export function Drawer() {
  return (
    <PermanentDrawer>
      <ToolbarSpacer />
      <StyledList>
        <NavButton
          to="/foundations"
          level={0}
          isParent={true}
          isSubheader={false}
        >
          <ListItemText primary="lvl1 parent" />
        </NavButton>
        <NavButton
          to="/components"
          level={1}
          isParent={false}
          isSubheader={true}
        >
          <ListItemText primary="lvl2 subheader" />
        </NavButton>
        <NavButton to="/layouts" level={2} isParent={false} isSubheader={false}>
          <ListItemText primary="lvl1 child" />
        </NavButton>
        <NavButton to="/pages" level={3} isParent={true} isSubheader={false}>
          <ListItemText primary="lvl2 parent" />
        </NavButton>
        <NavButton to="/utils" level={1} isParent={false} isSubheader={true}>
          <ListItemText primary="lvl3 subheader" />
        </NavButton>
        <NavButton to="/themes" level={2} isParent={false} isSubheader={false}>
          <ListItemText primary="lvl1 child" />
        </NavButton>
        <NavButton
          to="/templates"
          level={3}
          isParent={true}
          isSubheader={false}
        >
          <ListItemText primary="lvl2 parent" />
        </NavButton>
        <NavButton
          to="/components"
          level={1}
          isParent={false}
          isSubheader={true}
        >
          <ListItemText primary="lvl2 subheader" />
        </NavButton>
        <NavButton to="/layouts" level={2} isParent={false} isSubheader={false}>
          <ListItemText primary="lvl1 child" />
        </NavButton>
        <NavButton to="/pages" level={3} isParent={true} isSubheader={false}>
          <ListItemText primary="lvl2 parent" />
        </NavButton>
        <NavButton to="/utils" level={1} isParent={false} isSubheader={true}>
          <ListItemText primary="lvl3 subheader" />
        </NavButton>
        <NavButton to="/themes" level={2} isParent={false} isSubheader={false}>
          <ListItemText primary="lvl1 child" />
        </NavButton>
        <NavButton
          to="/templates"
          level={3}
          isParent={true}
          isSubheader={false}
        >
          <ListItemText primary="lvl2 parent" />
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
    isParent?: boolean;
    isSubheader?: boolean;
  };

const NavButton = styled(
  forwardRef<HTMLAnchorElement, NavButtonProps>(
    (
      {
        to,
        level = 0,
        isParent = false,
        isSubheader = false,
        className,
        ...props
      },
      ref
    ) => (
      <ListItemButton
        {...props}
        className={`foo ${className || ""}`}
        component={NavLink}
        to={to}
        ref={ref}
      />
    )
  ),
  {
    shouldForwardProp: (prop: PropertyKey) =>
      prop !== "level" && prop !== "isParent" && prop !== "isSubheader",
  }
)<NavButtonProps>(({ theme, level = 0, isParent, isSubheader }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2 + level),
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  // # !isParent
  ...(!isParent && {
    backgroundColor: "lightblue",
    "&.active": {
      cursor: "default",
      pointerEvents: "none",
      backgroundColor: theme.palette.primary.light,
      "& span": {
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    "&:hover": {
      backgroundColor: "lightblue",
    },
  }),
  // # isParent
  ...(isParent && {
    backgroundColor: "grey",
    "& .MuiListItemText-root > span": {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover, // Restored hover behavior
    },
  }),
  // # isSubheader
  ...(isSubheader && {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    cursor: "default",
    pointerEvents: "none",
    "& .MuiListItemText-root > span": {
      ...theme.typography.caption,
      color: theme.palette.text.secondary,
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

// const StyledListItemButton = styled((props) => (
//   <ListItemButton
//     component={NavLink}
//     className={({ isActive }) => {
//       return isActive ? "active" : "";
//     }}
//     {...props}
//     />
//   ),
//   { shouldForwardProp: (prop) =>
//     props !== 'level' &&
//     prop !== selected &&
//     prop !== 'isParent' &&
//     props !== isSubheader
//   }
// )(({ theme, level =0, isParent, isSubheader }) => ({
//   paddingRight: theme.spacing(1),
//   paddingLeft: theme.spacing(2 + level),
//   width: '100%',
//   '&:hover':{
//     backgroundColor: theme.palette.action.hover,
//   },
//   ...(!isParent && {
//     '&.active': {
//     cursor: 'default',
//     pointerEvents: 'none',
//     backgroundColor: theme.mixins.decomposeColor(
//       theme.palette.primary.light,
//       0.5
//     ),
//     '& span': {
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//     '&:hover': {
//       backgroundColor: theme.mixins.decomposeColor(
//         theme.palette.primary.light,
//         0.5
//       ),
//     },
//   })
// }));
