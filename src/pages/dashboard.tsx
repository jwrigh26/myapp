import Box from "@mui/material/Box";
import { useIntersect } from "hooks/useIntersect";
import PageLayout from "layouts/PageLayout";
import { lazy, Suspense, useEffect, useState } from "react";
import CallToAction from "components/CallToAction";
import { WidgetsDrawer } from "features/dashboard";

// This creates a map of file paths -> async import functions
const cardModules = import.meta.glob("./cards/*.tsx");

interface LazyCardProps {
  componentName: string;
  cardId: string;
}

export default function Dashboard() {
  const cardDefs = [
    { componentName: "CardA", cardId: "Ax000", otherMeta: "Foo" },
    { componentName: "CardB", cardId: "Bx001", otherMeta: "Bar" },
    { componentName: "CardC", cardId: "Cx002", otherMeta: "XYZ" },
    { componentName: "CardD", cardId: "Dx001", otherMeta: "HEP" },
    { componentName: "CardE", cardId: "Ex002", otherMeta: "PEP" },
    // etc.
  ];

  return (
    <>
      <PageLayout>
        <CallToAction title="Dashboard" />
        {cardDefs.map((def, idx) => (
          <LazyCardLoader
            key={idx}
            componentName={def.componentName}
            cardId={def.cardId}
          />
        ))}
      </PageLayout>
      <WidgetsDrawer />
    </>
  );
}

export function LazyCardLoader({ cardId, componentName }: LazyCardProps) {
  const [setRef, isNearViewport] = useIntersect({
    threshold: 0.01,
    rootMargin: "0px",
  });

  const [shouldLoadComponent, setShouldLoadComponent] = useState(false);

  useEffect(() => {
    if (isNearViewport && !shouldLoadComponent) {
      // TODO: pre-fetch data so it's ready
      // console.log("Pre-fetch data for card", cardId);
      setShouldLoadComponent(true);
    }
  }, [isNearViewport, shouldLoadComponent, cardId]);

  const CardLazy = shouldLoadComponent ? getLazyCard(componentName) : null;

  return (
    <Box ref={setRef} sx={{ m: 1 }}>
      {CardLazy ? (
        <Suspense fallback={<div>Loading card code…</div>}>
          <CardLazy cardId={cardId} />
        </Suspense>
      ) : (
        <div style={{ height: 320, background: "#EEE" }}>
          <p>Loading soon: {componentName}</p>
        </div>
      )}
    </Box>
  );
}

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
