import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { PropsWithChildren } from "react";

interface StyledGridProps {
  gap: number;
  padding: number;
}

const StyledGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== "gap" && prop !== "padding",
})<StyledGridProps>(({ theme, gap, padding }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto 1fr auto",
  gap: theme.spacing(gap),
  padding: theme.spacing(padding),
  backgroundColor: theme.palette.background.paper,
  maxWidth: "1536px",
}));

interface PageLayoutProps extends PropsWithChildren<{}> {
  gap?: number;
  padding?: number;
}

const PageLayout = ({ children, gap = 2, padding = 2 }: PageLayoutProps) => {
  return (
    <StyledGrid gap={gap} padding={padding}>
      {children}
    </StyledGrid>
  );
};

export default PageLayout;
