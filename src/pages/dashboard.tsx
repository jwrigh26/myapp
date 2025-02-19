import Box from "@mui/material/Box";
import CallToAction from "components/CallToAction";
import { WidgetsDrawer } from "features/dashboard";
import PageLayout from "layouts/PageLayout";
import { lazy, Suspense, memo, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoadingCard, useDashboard } from "features/dashboard";
import { CardData } from "src/types";


// This creates a map of file paths -> async import functions
const cardModules = import.meta.glob("./cards/*.tsx");

interface LazyCardProps {
  data: CardData;
}
  const cardDefs = [
    {
      componentName: "ColorCard",
      cardId: "Ax000",
      color: "primary.light",
      height: 128,
      order: 1,
    },
    {
      componentName: "ColorCard",
      cardId: "Bx000",
      color: "primary.main",
      height: 256,
      order: 2,
    },
    {
      componentName: "ColorCard",
      cardId: "Cx000",
      color: "primary.dark",
      height: 320,
      order: 3,
    },
    {
      componentName: "ColorCard",
      cardId: "Dx000",
      color: "secondary.light",
      height: 256,
      order: 4,
    },
    {
      componentName: "ColorCard",
      cardId: "Ex000",
      color: "secondary.main",
      height: 277,
      order: 5,
    },
    {
      componentName: "ColorCard",
      cardId: "Fx000",
      color: "secondary.dark",
      height: 377,
      order: 6,
    },
    // etc.
  ];

export default function Dashboard() {

  const { cards } = useDashboard(cardDefs);

  return (
    <DndProvider backend={HTML5Backend}>
      <PageLayout>
        <CallToAction title="Dashboard" />
        {cardDefs.map((def, idx) => (
          <LazyCardLoader key={idx} data={def} />
        ))}
      </PageLayout>
      <WidgetsDrawer />
    </DndProvider>
  );
}

export const LazyCardLoader = memo(({ data }: LazyCardProps) => {
  const CardLazy = useMemo(() => getLazyCard(data.componentName), [data.componentName]);

  return (
    <Box sx={{ m: 1 }}>
      {CardLazy ? (
        <Suspense fallback={<LoadingCard height={data.height} />}>
          <CardLazy
            cardId={data.cardId}
            color={data.color}
            height={data.height}
          />
        </Suspense>
      ) : (
        <LoadingCard height={data.height} />
      )}
    </Box>
  );
});

// Helper function that returns a lazy component
export function getLazyCard(componentName: string) {
  // Construct the path we expect based on the name
  const path = `./cards/${componentName}.tsx`;

  // Check if it exists in the map
  const loader = cardModules[path];
  if (!loader) {
    throw new Error(`Card module not found: ${path}`);
  }

  // Return a lazy component that calls the async import
  // Note: as any is used here to avoid TS errors
  return lazy(loader as any);
}
