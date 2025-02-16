import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";

interface CardProps {
  cardId: string;
}

export default function LazyCard({ cardId }: CardProps) {
  // React Query fetch
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cardData", cardId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("CardE.tsx: fetch data for card", cardId);
      return {
        description: "This dummy card E.",
      };
    },
  });

  if (isLoading) return <LoadingCard />;
  if (isError) return <div>Error loading card data</div>;

  return (
    <div style={{ border: "1px solid #CCC", padding: "1rem" }}>
      <h3>Card ID: {cardId}</h3>
      <p>{data?.description ?? "No description available"}</p>
      {/* Render whatever else you want */}
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    </div>
  );
}

function LoadingCard() {
  return (
    <div style={{ border: "1px solid #CCC", padding: "1rem" }}>
      <h3>Card ID: Loading…</h3>
      <p>Loading data…</p>
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    </div>
  );
}
