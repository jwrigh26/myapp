// useWorkspace.ts
import { useCallback, useState } from 'react';
import type {
  BlockItem,
  BlockItemState,
  UseWorkspaceReturn,
  WorkspaceState,
} from '../types';

/**
 * useWorkspace
 * @param dropZoneCount The number of drop zones in the workspace.
 */
export function useWorkspace(dropZoneCount: number): UseWorkspaceReturn {
  // Initialize the workspace with fixed drop zones (all empty initially)
  const [items, setItems] = useState<WorkspaceState>(
    Array(dropZoneCount).fill(null)
  );

  // Place a block in a specific drop zone
  const placeBlock = useCallback((block: BlockItemState, index: number) => {
    if (!block) {
      return;
    }
    setItems((prev) => {
      const newWorkspace = [...prev];
      newWorkspace[index] = block as BlockItem;
      return newWorkspace;
    });
  }, []);

  // Remove a block from a specific drop zone (set to empty)
  const removeBlock = useCallback((index: number) => {
    setItems((prev) => {
      const newWorkspace = [...prev];
      newWorkspace[index] = null;
      return newWorkspace;
    });
  }, []);

  // Reorder blocks by moving one from a source index to a target index
  const reorderBlocks = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const newWorkspace = [...prev];
      const [movedBlock] = newWorkspace.splice(fromIndex, 1);
      newWorkspace.splice(toIndex, 0, movedBlock);
      return newWorkspace;
    });
  }, []);

  // Reset the workspace to all empty drop zones
  const resetWorkspace = useCallback(() => {
    setItems(Array(dropZoneCount).fill(null));
  }, [dropZoneCount]);

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
    reorderBlocks,
    reset: resetWorkspace,
  };
}
