import { useTemp } from '@/hooks/useContext';
import { useCallback, useEffect } from 'react';
import { BlockItem } from '../types';
import { isEmpty } from '@/utils/safety';

export function useCarousel<T extends BlockItem>(initialItems: T[] = []) {
  const { temp, setTemp } = useTemp('carousel');
  const { temp: refTemp, setTemp: setRefTemp } = useTemp('carouselRef');

  const items: T[] = temp?.items || initialItems || [];

  useEffect(() => {
    if (!refTemp?.ref && !isEmpty(initialItems)) {
      const ref = {
        current: initialItems,
      };
      setRefTemp({ ref });
    }
  }, []);

  const setItems = useCallback((newItems: T[]) => {
    setTemp({ items: newItems });
  }, []);

  const getItems = useCallback(() => temp.items || [], [temp.items]);

  // Add a new item to the carousel
  const addItem = useCallback(
    ({ items, item, position }: { items: T[]; item: T; position?: number }) => {
      if (position !== undefined && position >= 0 && position <= items.length) {
        const updatedItems = [...items];
        updatedItems.splice(position, 0, item);
        setItems(updatedItems);
        return updatedItems;
      }

      const updatedItems = [...items, item];
      setItems(updatedItems);
      return updatedItems;
    },
    []
  );

  // Remove an item from the carousel by position
  const removeItem = useCallback(
    ({ items, position }: { items: T[]; position: number }) => {
      const removedItem = items[position];

      if (position < 0 || position >= items.length) {
        return undefined;
      }

      const newItems = [...items];
      newItems.splice(position, 1);
      setItems(newItems);

      // Return the removed item
      return removedItem;
    },
    [items]
  );

  // Reshuffle the carousel items in random order
  // Fisher-Yates shuffle algorithm
  const shuffleItems = useCallback(({ items }: { items: T[] }) => {
    const newItems = [...items];
    for (let i = newItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }
    setItems(newItems);
    return newItems;
  }, []);

  // Reset carousel to initial items
  const resetItems = useCallback(() => {
    const itemsRef = refTemp.ref;
    if (!initialItems || !itemsRef.current) {
      return;
    }
    setItems([...itemsRef.current]);
  }, [initialItems]);

  return {
    items,
    getItems,
    setItems,
    addItem,
    removeItem,
    shuffleItems,
    resetItems,
  };
}
