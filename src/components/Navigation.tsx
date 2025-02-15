import Button, { ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router"; // Ensure you use `react-router-dom`
import DarkLightToggle from "./DarkLightToggle";
import WidgetToggle from "./WidgetToggle";

export default function Navigation() {
  return (
    <NavStack direction="row" component="nav" gap={1}>
      <NavDivider orientation="vertical" flexItem sx={{ ml: 2 }} />
      <NavButton to="/">Home</NavButton>
      {/* <NavButton to="/foundations">Foundations</NavButton> */}
      {/* <NavButton to="/fullstack">Full Stack</NavButton> */}
      {/* <NavButton to="/practice">Practice</NavButton> */}
      {/* <NavButton to="/resources">Resources</NavButton> */}
      {/* <NavDivider orientation="vertical" flexItem /> */}
      <NavButton to="/dashboard">Dashboard</NavButton>
      {/* <NavButton to="/about">About</NavButton> */}
      {/* <NavButton to="/contact">Contact</NavButton> */}
      <Box sx={{ flexGrow: 1 }} />
      <WidgetToggle />
      <DarkLightToggle /> 
    </NavStack>
  );
}

// ################################################
// ### Styled Components
// ################################################

type NavigationButtonProps = Omit<ButtonProps, "href"> & NavLinkProps;

const NavButton = styled(
  forwardRef<HTMLAnchorElement, NavigationButtonProps>(
    ({ to, ...props }, ref) => (
      <Button {...props} component={NavLink} to={to} ref={ref} />
    )
  )
)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightRegular,
  textDecoration: "none",
  padding: theme.spacing(0.5, 1),
  opacity: 0.8,
  borderRadius: 2,
  "&:hover": {
    // opacity: 0.6,
    backgroundColor: theme.mixins.decomposeColor(
      theme.palette.primary.light,
      0.5
    ),
  },
  "&.active": {
    opacity: 1.0,
    backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.main} 60%, ${theme.palette.secondary.dark} 100%)`,
    color: theme.palette.primary.dark,
  },
}));

const NavStack = styled(Stack)<StackProps>(({ theme }) => ({
  width: "100%",
  padding: 0,
  margin: 0,
}));

const NavDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.mixins.decomposeColor(
    theme.palette.primary.contrastText,
    0.5
  ),
  // margin: theme.spacing(2, 2),
  margin: theme.spacing(0, 1),
}));
