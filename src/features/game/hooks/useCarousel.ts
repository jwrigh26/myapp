// useCarousel.ts
import { useCallback, useState } from 'react';
import type {
  BlockItem,
  BlockItemState,
  CarouselState,
  UseCarouselReturn,
} from '../types';

// TODO: Fix this to have some things like Workspace

/**
 * useCarousel
 * @param initialItems An array of items to initialize the carousel.
 */
export function useCarousel(initialItems: CarouselState): UseCarouselReturn {
  const [items, setItems] = useState<CarouselState>(initialItems);

  // Place a block in a specific Carousel drop zone
  const placeBlock = useCallback((block: BlockItemState, index: number) => {
    setItems((prev) => {
      const newWorkspace = [...prev];
      newWorkspace[index] = block as BlockItem;
      return newWorkspace;
    });
  }, []);

  const removeBlock = useCallback((index: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = null;
      return newItems;
    });
  }, []);

  // Reset the carousel to the initial items.
  const resetItems = useCallback(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Shuffle the carousel items randomly.
  const shuffleItems = useCallback(() => {
    setItems((prev) => {
      const newItems = [...prev];
      for (let i = newItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
      }
      return newItems;
    });
  }, []);

  // Auto-scroll callback to be called when a block is dropped.
  // This waits 300ms (based on MUI transition times) before triggering any auto-scroll action.
  // The Carousel component should use this callback to trigger scrolling via its ref.
  const onBlockDropped = useCallback(() => {
    setTimeout(() => {
      console.log('Block dropped - trigger auto-scroll');
      // You can extend this to call a scroll method on your carousel ref.
      // For example: carouselRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }, 300);
  }, []);

  const getItem = useCallback(
    (id: string) => {
      return items.find((item) => item?.id === id);
    },
    [items]
  );

  return {
    items,
    getItem,
    placeBlock,
    removeBlock,
    shuffleItems,
    onBlockDropped,
    reset: resetItems,
  };
}
