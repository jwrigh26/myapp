import List from "@mui/material/List";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { PermanentDrawer } from "components/Drawer";
import Icon from "components/Icon";
import { forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router";
import "./index.css";
// import Collapse from '@mui/material/Collapse';
// import Toolbar from '@mui/material/Toolbar';

export function Drawer() {
  return (
    <PermanentDrawer>
      <List>
        <ListItemButton component={NavLink} to="/foundations" end>
          <ListItemText primary="Foundations" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/components" end>
          <ListItemText primary="Components" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/layouts" end>
          <ListItemText primary="Layouts" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/pages" end>
          <ListItemText primary="Pages" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/utils" end>
          <ListItemText primary="Utils" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/themes" end>
          <ListItemText primary="Themes" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/templates" end>
          <ListItemText primary="Templates" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/playground" end>
          <ListItemText primary="Playground" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/docs" end>
          <ListItemText primary="Docs" />
        </ListItemButton>
      </List>
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
}));

type NavButtonProps = Omit<ListItemButtonProps, "href" | "className"> &
  NavLinkProps & {
    level?: number;
    isParent?: boolean;
    isSubheader?: boolean;
  };

// const BaseNavButton = forwardRef<HTMLAnchorElement, NavButtonProps>(
//   ({ to, ...props }, ref) => (
const BaseNavButton = forwardRef<HTMLAnchorElement, NavButtonProps>(
  ({ to, level = 0, isParent = false, isSubheader = false, ...props }, ref) => {
    return (
      <ListItemButton
        {...props}
        className="foo"
        component={NavLink}
        to={to}
        ref={ref}
      />
    );
  }
);

// Styled component
const StyledListItemButton = styled(BaseNavButton, {
  shouldForwardProp: (prop) =>
    prop !== "level" && prop !== "isParent" && prop !== "isSubheader",
})<NavButtonProps>(({ theme, level = 0, isParent, isSubheader }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2 + level),
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  // # !isParent
  ...(!isParent && {
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
      backgroundColor: "grey",
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
