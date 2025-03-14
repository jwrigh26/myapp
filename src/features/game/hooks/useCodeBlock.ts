import { isEmpty } from '@/utils/safety';
import { useCallback, useState } from 'react';
import { ItemTypes } from '../constants';
import { BlockItem } from '../types';
import { useCarousel } from './useCarousel';
import { ContainerType } from '../types';

  // // Use the carousel hook to manage carousel blocks
  // const initialBlocks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(
  //   (block) => ({
  //     id: `block-${block}`,
  //     type: ItemTypes.CODE_BLOCK,
  //     content: block,
  //   })
  // );

export function useCodeBlock<T extends BlockItem>(gameSolutionBlocks: T[] = []) {

  // We expect the useCarousel to already be initialized with initial items
  // From the game component
  const carousel = useCarousel<BlockItem>();

  if (isEmpty(carousel.items)) {
    console.error('Carousel items are empty');
  }

  // Blocks placed in the workspace/code editor
  const [workspaceBlocks, setWorkspaceBlocks] = useState<BlockItem[]>([]);

  // Move block within the same container (carousel or workspace)
  const moveBlock = useCallback(
    (dragIndex: number, hoverIndex: number, sourceContainer: ContainerType) => {
      if (sourceContainer === ContainerType.CAROUSEL) {
        const carouselBlocks = carousel.getItems();
        // Bounds checking
        if (
          hoverIndex < 0 ||
          hoverIndex >= carouselBlocks.length ||
          dragIndex < 0 ||
          dragIndex >= carouselBlocks.length
        ) {
          console.warn('Invalid carousel index');
          return;
        }

        // Swap the blocks
        const copiedBlocks = [...carouselBlocks];
        const [movedBlock] = copiedBlocks.splice(dragIndex, 1);
        copiedBlocks.splice(hoverIndex, 0, movedBlock);

        // Update the state
        carousel.setItems(copiedBlocks);
      } else if (sourceContainer === ContainerType.WORKSPACE) {
        // Bounds checking
        if (
          hoverIndex < 0 ||
          hoverIndex >= workspaceBlocks.length ||
          dragIndex < 0 ||
          dragIndex >= workspaceBlocks.length
        ) {
          console.warn('Invalid workspace index');
          return;
        }

        // Swap the blocks
        const copiedBlocks = [...workspaceBlocks];
        const [movedBlock] = copiedBlocks.splice(dragIndex, 1);
        copiedBlocks.splice(hoverIndex, 0, movedBlock);

        // Update the state
        setWorkspaceBlocks(copiedBlocks);
      }
    },
    [carousel, workspaceBlocks]
  );

  // Move block from carousel to workspace
  const moveToWorkspace = useCallback(
    (carouselIndex: number, workspaceIndex: number) => {
      const carouselBlocks = carousel.getItems();
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
      carousel.removeItem({ items: carouselBlocks, position: carouselIndex });

      // Add to workspace at the specified position
      const newWorkspaceBlocks = [...workspaceBlocks];
      if (workspaceIndex >= newWorkspaceBlocks.length) {
        // If the index is beyond the end, just append
        newWorkspaceBlocks.push(blockToMove);
      } else {
        newWorkspaceBlocks.splice(workspaceIndex, 0, blockToMove);
      }

      // Update workspace state
      setWorkspaceBlocks(newWorkspaceBlocks);
    },
    [carousel, workspaceBlocks]
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
      setWorkspaceBlocks(newWorkspaceBlocks);

      // Add to carousel at the specified position
      const carouselBlocks = carousel.getItems();
      carousel.addItem({
        items: carouselBlocks,
        item: blockToMove,
        position: carouselIndex,
      });
    },
    [carousel, workspaceBlocks]
  );

  // Discard a block (move to a discard pile or delete)
  const discardBlock = useCallback(
    (blockIndex: number, sourceContainer: ContainerType) => {
      if (sourceContainer === ContainerType.CAROUSEL) {
        const carouselBlocks = carousel.getItems();
        carousel.removeItem({ items: carouselBlocks, position: blockIndex });
      } else {
        const newBlocks = [...workspaceBlocks];
        if (blockIndex >= 0 && blockIndex < newBlocks.length) {
          newBlocks.splice(blockIndex, 1);
          setWorkspaceBlocks(newBlocks);
        }
      }
    },
    [carousel, workspaceBlocks]
  );

  // Reset all blocks back to initial state
  const resetBlocks = useCallback(() => {
    carousel.resetItems();
    setWorkspaceBlocks([]);
  }, [carousel]);

  return {
    carouselBlocks: carousel.items,
    workspaceBlocks,
    moveBlock,
    moveToWorkspace,
    moveToCarousel,
    discardBlock,
    resetBlocks,
  };
}
