import Box from "@mui/material/Box";
import CallToAction from "components/CallToAction";
import { WidgetsDrawer } from "features/dashboard";
import PageLayout from "layouts/PageLayout";
import { lazy, Suspense, useState } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

// This creates a map of file paths -> async import functions
const cardModules = import.meta.glob("./cards/*.tsx");

interface LazyCardProps {
  componentName: string;
  cardId: string;
}

export default function Dashboard() {
  // Let's pretend we have a large or unknown number of cards:
  // We only load a small batch at a time
  const [items, setItems] = useState<
    Array<{ cardId: string; componentName: string }>
  >(
    [] // start with empty
  );
  const [hasMore, setHasMore] = useState(true);

  const cardDefs = [
    { componentName: "CardB", cardId: "Bx001", otherMeta: "Bar" },
    { componentName: "CardC", cardId: "Cx002", otherMeta: "XYZ" },
    { componentName: "CardA", cardId: "Ax000", otherMeta: "Foo" },
    { componentName: "CardD", cardId: "Dx001", otherMeta: "HEP" },
    { componentName: "CardE", cardId: "Ex002", otherMeta: "PEP" },

    // etc.
  ];

  // Simulate loading more items
  function loadMoreItems(startIndex: number, stopIndex: number) {
    // In a real scenario, you'd fetch from server here
    // For the demo, we just slice from cardDefs
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const nextChunk = cardDefs.slice(items.length, items.length + 2);
        setItems((prev) => [...prev, ...nextChunk]);
        if (items.length + 2 >= cardDefs.length) {
          setHasMore(false);
        }
        resolve();
      }, 1000); // simulate network delay
    });
  }

  // Tells InfiniteLoader if an item is already loaded
  function isItemLoaded(index: number) {
    return index < items.length;
  }

  // The total number of items is either infinite or a known large number
  // If you have a known total, put that here. If truly unknown, pick a big number.
  const itemCount = hasMore ? items.length + 10 : items.length;

  return (
    <PageLayout>
      <CallToAction title="Dashboard (Virtualized)" />

      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={1000} // The height of the scrolling window
            itemCount={itemCount}
            itemSize={400} // Approximate height of each card
            width={"100%"}
            onItemsRendered={onItemsRendered}
            ref={ref}
            itemData={{ items }}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>

      <WidgetsDrawer />
    </PageLayout>
  );
}

export function LazyCardLoader({ cardId, componentName }: LazyCardProps) {
  const CardLazy = cardId ? getLazyCard(componentName) : null;

  return (
    <Box sx={{ m: 1 }}>
      {CardLazy ? (
        <Suspense fallback={<div>Loading card code…</div>}>
          <CardLazy cardId={cardId} />
        </Suspense>
      ) : (
        <div style={{ height: 20, background: "#EEE" }}>
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

// Our "row" component that React Window will render for each index
function Row({ index, style, data }: any) {
  // data = { items: [...], isItemLoaded: fn, etc. }
  const { items } = data;

  // If the item isn’t loaded yet, show a loading placeholder
  if (!items[index]) {
    return (
      <div style={style}>
        <p>Loading card...</p>
      </div>
    );
  }

  const { cardId, componentName } = items[index];
  const CardLazy = getLazyCard(componentName);

  return (
    <Box style={style} sx={{ p: 1 }}>
      <Suspense fallback={<div>Loading card code…</div>}>
        <CardLazy cardId={cardId} />
      </Suspense>
    </Box>
  );
}
