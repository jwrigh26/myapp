import Button, { ButtonProps } from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router"; // Ensure you use `react-router-dom`

export default function Navigation() {
  return (
    <NavStack direction="row" component="nav">
      <NavDivider orientation="vertical" flexItem sx={{ ml: 2 }} />
      <NavButton to="/">Home</NavButton>
      <NavButton to="/foundations">Foundations</NavButton>
      <NavButton to="/fullstack">Full Stack</NavButton>
      <NavButton to="/practice">Practice</NavButton>
      <NavButton to="/resources">Resources</NavButton>
      <NavDivider orientation="vertical" flexItem />
      <NavButton to="/about">About</NavButton>
      <NavButton to="/contact">Contact</NavButton>
    </NavStack>
  );
}

// ################################################
// ### Styled Components
// ################################################

type NavigationButtonProps = Omit<ButtonProps, "href"> & NavLinkProps;

// Base component forwards ref and props!
const BaseNavigationButton = forwardRef<
  HTMLAnchorElement,
  NavigationButtonProps
>(({ to, ...props }, ref) => (
  <Button {...props} component={NavLink} to={to} ref={ref} />
));

// NavigationButton component styles the base component
const NavButton = styled(BaseNavigationButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightMedium,
  textDecoration: "none",
  padding: theme.spacing(0.5, 1),
  opacity: 0.8,
  borderRadius: 2,
  "&:hover": {
    opacity: 0.6,
  },
  "&.active": {
    opacity: 1.0,
    backgroundColor: theme.mixins.decomposeColor(
      theme.palette.primary.light,
      0.5
    ),
    color: theme.palette.text.primary,
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
