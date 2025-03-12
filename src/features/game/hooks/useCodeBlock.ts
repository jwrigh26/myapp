import { useState, useCallback } from 'react';
import { ItemTypes } from '../constants';

interface Block {
  id: string;
  type: string;
  content: string;
}

enum ContainerType {
  CAROUSEL = 'carousel',
  WORKSPACE = 'workspace',
}

export function useCodeBlock() {
  // Track blocks in both the carousel and workspace
  const [carouselBlocks, setCarouselBlocks] = useState(
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((block) => ({
      id: `block-${block}`,
      type: ItemTypes.CODE_BLOCK,
      content: block,
    }))
  );

  // Blocks placed in the workspace/code editor
  const [workspaceBlocks, setWorkspaceBlocks] = useState<Block[]>([]);

  // Move block within the same container (carousel or workspace)
  const moveBlock = useCallback(
    (
      dragIndex: number,
      hoverIndex: number,
      sourceContainer: ContainerType
    ) => {
      if (sourceContainer === ContainerType.CAROUSEL) {
        const copiedBlocks = [...carouselBlocks];

        // Bounds checking
        if (
          hoverIndex < 0 ||
          hoverIndex >= copiedBlocks.length ||
          dragIndex < 0 ||
          dragIndex >= copiedBlocks.length
        ) {
          console.warn('Invalid carousel index');
          return;
        }

        // Swap the blocks
        const [movedBlock] = copiedBlocks.splice(dragIndex, 1);
        copiedBlocks.splice(hoverIndex, 0, movedBlock);

        // Update the state
        setCarouselBlocks(copiedBlocks);
      } else if (sourceContainer === ContainerType.WORKSPACE) {
        const copiedBlocks = [...workspaceBlocks];

        // Bounds checking
        if (
          hoverIndex < 0 ||
          hoverIndex >= copiedBlocks.length ||
          dragIndex < 0 ||
          dragIndex >= copiedBlocks.length
        ) {
          console.warn('Invalid workspace index');
          return;
        }

        // Swap the blocks
        const [movedBlock] = copiedBlocks.splice(dragIndex, 1);
        copiedBlocks.splice(hoverIndex, 0, movedBlock);

        // Update the state
        setWorkspaceBlocks(copiedBlocks);
      }
    },
    [carouselBlocks, workspaceBlocks]
  );

  // Move block from carousel to workspace
  const moveToWorkspace = useCallback(
    (carouselIndex: number, workspaceIndex: number) => {
      if (
        carouselIndex < 0 ||
        carouselIndex >= carouselBlocks.length ||
        workspaceIndex < 0
      ) {
        console.warn('Invalid indices for moveToWorkspace');
        return;
      }

      // Copy the block from carousel
      const blockToMove = { ...carouselBlocks[carouselIndex] };

      // Remove from carousel
      const newCarouselBlocks = [...carouselBlocks];
      newCarouselBlocks.splice(carouselIndex, 1);

      // Add to workspace at the specified position
      const newWorkspaceBlocks = [...workspaceBlocks];
      if (workspaceIndex >= newWorkspaceBlocks.length) {
        // If the index is beyond the end, just append
        newWorkspaceBlocks.push(blockToMove);
      } else {
        newWorkspaceBlocks.splice(workspaceIndex, 0, blockToMove);
      }

      // Update both states
      setCarouselBlocks(newCarouselBlocks);
      setWorkspaceBlocks(newWorkspaceBlocks);
    },
    [carouselBlocks, workspaceBlocks]
  );

  // Move block from workspace back to carousel
  const moveToCarousel = useCallback(
    (workspaceIndex: number, carouselIndex: number) => {
      if (
        workspaceIndex < 0 ||
        workspaceIndex >= workspaceBlocks.length ||
        carouselIndex < 0
      ) {
        console.warn('Invalid indices for moveToCarousel');
        return;
      }

      // Copy the block from workspace
      const blockToMove = { ...workspaceBlocks[workspaceIndex] };

      // Remove from workspace
      const newWorkspaceBlocks = [...workspaceBlocks];
      newWorkspaceBlocks.splice(workspaceIndex, 1);

      // Add to carousel at the specified position
      const newCarouselBlocks = [...carouselBlocks];
      if (carouselIndex >= newCarouselBlocks.length) {
        // If the index is beyond the end, just append
        newCarouselBlocks.push(blockToMove);
      } else {
        newCarouselBlocks.splice(carouselIndex, 0, blockToMove);
      }

      // Update both states
      setWorkspaceBlocks(newWorkspaceBlocks);
      setCarouselBlocks(newCarouselBlocks);
    },
    [carouselBlocks, workspaceBlocks]
  );

  // Discard a block (move to a discard pile or delete)
  const discardBlock = useCallback(
    (blockIndex: number, sourceContainer: 'carousel' | 'workspace') => {
      if (sourceContainer === 'carousel') {
        const newBlocks = [...carouselBlocks];
        if (blockIndex >= 0 && blockIndex < newBlocks.length) {
          newBlocks.splice(blockIndex, 1);
          setCarouselBlocks(newBlocks);
        }
      } else {
        const newBlocks = [...workspaceBlocks];
        if (blockIndex >= 0 && blockIndex < newBlocks.length) {
          newBlocks.splice(blockIndex, 1);
          setWorkspaceBlocks(newBlocks);
        }
      }
    },
    [carouselBlocks, workspaceBlocks]
  );

  // Reset all blocks back to initial state
  const resetBlocks = useCallback(() => {
    setCarouselBlocks(
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((block) => ({
        id: `block-${block}`,
        type: ItemTypes.CODE_BLOCK,
        content: block,
      }))
    );
    setWorkspaceBlocks([]);
  }, []);

  return {
    carouselBlocks,
    workspaceBlocks,
    moveBlock,
    moveToWorkspace,
    moveToCarousel,
    discardBlock,
    resetBlocks,
  };
}
