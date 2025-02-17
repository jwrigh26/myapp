import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import MUICard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Icon from "components/Icon";
import IconButton from "@mui/material/IconButton";
import { mdiRefresh } from "@mdi/js";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

interface CardProps {
  title: string;
  color: string;
  height: number;
  loading: boolean;
}

interface LoadingCardProps {
  height?: number;
}

export default function Card({
  title,
  color,
  height,
  loading: isLoading,
}: CardProps) {
  if (isLoading) return <LoadingCard height={height} />;
  const initial = title.charAt(0).toUpperCase();
  return (
    <MUICard>
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
    </MUICard>
  );
}

export function LoadingCard({ height=256 }: LoadingCardProps) {
  return (
    <MUICard>
      <CardContent>
        <Skeleton variant="rounded" width={"100%"} height={height || 256} />
      </CardContent>
    </MUICard>
  );
}

function LetterAvatar({ children }: { children: string }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "common.white", color: "text.primary" }}>
        {children}
      </Avatar>
    </Stack>
  );
}
