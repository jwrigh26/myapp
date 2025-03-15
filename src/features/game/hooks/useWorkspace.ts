// useWorkspace.ts
import { useState, useCallback } from 'react';
import { BlockItem } from '../types';

export type WorkspaceState = Array<BlockItem | null>;

export interface UseWorkspaceReturn {
  workspace: WorkspaceState;
  placeBlock: (block: BlockItem, index: number) => void;
  removeBlock: (index: number) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  resetWorkspace: () => void;
}

export function useWorkspace(dropZoneCount: number): UseWorkspaceReturn {
  // Initialize the workspace with fixed drop zones (all empty initially)
  const [workspace, setWorkspace] = useState<WorkspaceState>(
    Array(dropZoneCount).fill(null)
  );

  // Place a block in a specific drop zone
  const placeBlock = useCallback((block: BlockItem, index: number) => {
    setWorkspace(prev => {
      const newWorkspace = [...prev];
      newWorkspace[index] = block;
      return newWorkspace;
    });
  }, []);

  // Remove a block from a specific drop zone (set to empty)
  const removeBlock = useCallback((index: number) => {
    setWorkspace(prev => {
      const newWorkspace = [...prev];
      newWorkspace[index] = null;
      return newWorkspace;
    });
  }, []);

  // Reorder blocks by moving one from a source index to a target index
  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setWorkspace(prev => {
      const newWorkspace = [...prev];
      const [movedBlock] = newWorkspace.splice(fromIndex, 1);
      newWorkspace.splice(toIndex, 0, movedBlock);
      return newWorkspace;
    });
  }, []);

  // Reset the workspace to all empty drop zones
  const resetWorkspace = useCallback(() => {
    setWorkspace(Array(dropZoneCount).fill(null));
  }, [dropZoneCount]);

  return { workspace, placeBlock, removeBlock, moveBlock, resetWorkspace };
}
