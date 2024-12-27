import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default function Navigation() {
  return <StyledWrapper>{/* Desktop Navigation */}</StyledWrapper>;
}

// ################################################
// ### Styled Components
// ################################################

const StyledWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: theme.zIndex.drawer + 2,
  boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.1)`,
}));
