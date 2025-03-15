// useCarousel.ts
import { useState, useCallback } from 'react';
import { BlockItem } from '../types';

export interface UseCarouselReturn<T> {
  items: T[];
  removeBlock: (id: string) => void;
  resetItems: () => void;
  shuffleItems: () => void;
  onBlockDropped: () => void;
}

export function useCarousel<T extends { id: string }>(initialItems: T[]): UseCarouselReturn<T> {
  const [items, setItems] = useState<T[]>(initialItems);

  // Remove a block from the carousel by its ID.
  const removeBlock = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Reset the carousel to the initial items.
  const resetItems = useCallback(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Shuffle the carousel items randomly.
  const shuffleItems = useCallback(() => {
    setItems(prev => {
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
      console.log("Block dropped - trigger auto-scroll");
      // You can extend this to call a scroll method on your carousel ref.
      // For example: carouselRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }, 300);
  }, []);

  return {
    items,
    removeBlock,
    resetItems,
    shuffleItems,
    onBlockDropped,
  };
}
