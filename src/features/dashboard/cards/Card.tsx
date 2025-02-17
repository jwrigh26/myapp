import { mdiRefresh } from "@mdi/js";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import MUICard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Icon from "components/Icon";
import { BaseCardData } from "src/types";

interface CardProps extends BaseCardData {
  initial: string;
  loading: boolean;
}

interface LoadingCardProps {
  height?: number;
}

export default function Card({
  initial,
  color,
  height,
  loading: isLoading,
}: CardProps) {
  if (isLoading) return <LoadingCard height={height} />;
  return (
    <StyledCard>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color || "primary.main",
            color: "primary.contrastText",
            minHeight: height || 256,
            p: 2,
          }}
        >
          <LetterAvatar>{initial}</LetterAvatar>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton sx={{ ml: "auto" }}>
          <Icon path={mdiRefresh} />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
}

export function LoadingCard({ height = 256 }: LoadingCardProps) {
  return (
    <StyledCard>
      <CardContent>
        <Skeleton variant="rounded" width={"100%"} height={height || 256} />
      </CardContent>
      <CardActions>
        <Skeleton
          variant="rectangular"
          width={40}
          height={40}
          sx={{ ml: "auto" }}
        />
        <Skeleton variant="rectangular" width={40} height={40} />
      </CardActions>
    </StyledCard>
  );
}

function LetterAvatar({ children }: { children: string }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "background.paper", color: "text.primary" }}>
        {children}
      </Avatar>
    </Stack>
  );
}

// #################################################
// ### Styles
// #################################################

const StyledCard = styled(MUICard)(({ theme }) => ({
  padding: 0,
  width: "100%",
  " & .MuiCardContent-root": {
    padding: 0,
  },
}));
