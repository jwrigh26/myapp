import { useQuery } from "@tanstack/react-query";
import { Card } from "features/dashboard";
import { BaseCardData as CardProps } from "src/types";

export default function LazyCard({ cardId, color = "primary.main", height=256 }: CardProps) {
  // React Query fetch
  const { isLoading, isError } = useQuery({
    queryKey: ["cardData", cardId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        description: "This dummy card.",
      };
    },
  });

  if (isError) return <div>Error loading card data</div>;

  const initial = cardId.charAt(0).toUpperCase();

  return (
    <Card
      initial={initial}
      cardId={cardId}
      color={color}
      height={height}
      loading={isLoading}
    />
  );
}
