import { ReactNode } from 'react';

export interface BlockItem {
  id: string;
  type: string;
  content: ReactNode | string;
  order?: number;
}

export type BlockItemState = BlockItem | null | undefined;

export type DraggedItem = { id: string; index: number };

export type CarouselState = Array<BlockItem | null>;

export interface GameResult {
  valid: boolean;
  details?: string;
}

export interface UseCarouselReturn {
  items: CarouselState;
  getItem: (index: string) => BlockItemState;
  placeBlock: (block: BlockItemState, index: number) => void;
  removeBlock: (index: number) => void;
  reset: () => void;
  shuffleItems: () => void;
  onBlockDropped: (item: DraggedItem) => void;
}

export type WorkspaceState = Array<BlockItem | null>;

export interface UseWorkspaceReturn {
  items: WorkspaceState;
  getItem: (index: string) => BlockItemState;
  placeBlock: (block: BlockItemState, index: number) => void;
  removeBlock: (index: number) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  reset: () => void;
}

// sourceContainer: ContainerType check source container before
export interface UseGameActions {
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  moveToWorkspace: (
    block: BlockItem,
    carouselIndex: number,
    workspaceIndex: number
  ) => void;
  moveToCarousel: (
    block: BlockItem,
    workspaceIndex: number,
    carouselIndex: number
  ) => void;
  onBlockDropped: (item: DraggedItem) => void;
  resetGame: () => void;
}

interface GameTemp {
  actions?: UseGameActions;
}

export interface UseGameReturn {
  result: GameResult;
  validateGame: (workspace: WorkspaceState) => void;
}
