import { mdiDotsHorizontal } from "@mdi/js";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Icon from "components/Icon";
import { useNavigate } from "react-router";

export default function MobileNavigation() {
  const navigate = useNavigate();
  const paths = ["/", "/about", "/contact"];

  return (
    <StyledWrapper>
      <StyledBottomNavigation
        showLabels
        value={paths}
        onChange={(_, newValue) => navigate(newValue)}
      >
        <StyledBottomNavigationAction label="Home" value="/" />
        <StyledBottomNavigationAction
          label="Foundations"
          value="/foundations"
        />
        <StyledBottomNavigationAction label="Fullstack" value="/fullstack" />
        <StyledBottomNavigationAction
          icon={<Icon path={mdiDotsHorizontal} />}
          value="/more"
        />
      </StyledBottomNavigation>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "fixed",
  left: 0,
  bottom: 0,
  zIndex: theme.zIndex.drawer + 2,
  // boxShadow: `0px 4px 8px red`, // Update this line
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  boxShadow: `0px -4px 6px rgba(0, 0, 0, 0.1), 0px -4px 4px rgba(0, 0, 0, 0.08), 0px -1px 10px rgba(0, 0, 0, 0.06)`, // Lighten the shadow by reducing opacity
  backgroundColor: theme.palette.secondary.dark,
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    color: theme.palette.secondary.contrastText,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
      transition: "all 0.2s ease-out",
      transform: "scaleX(1) scaleY(1)",
      zIndex: 0,
    },
    "&:active::before": {
      backgroundColor: theme.mixins.decomposeColor(
        theme.palette.secondary.main,
        0.8
      ),
      transform: "scaleX(0.95) scaleY(0.85)", // separate x and y scaling
    },
    "& > *": {
      position: "relative",
      zIndex: 1,
    },
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
    },
    ":hover::before": {
      backgroundColor: theme.palette.secondary.main,
    },
  })
);
