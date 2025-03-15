import { ReactNode } from 'react';

export interface BlockItem {
  id: string;
  type: string;
  content: ReactNode | string;
  order?: number;
}

export enum ContainerType {
  CAROUSEL = 'carousel',
  WORKSPACE = 'workspace',
}

export type CarouselState = Array<BlockItem | null>;

export interface GameResult {
  valid: boolean;
  details?: string;
}

export interface UseCarouselReturn {
  items: CarouselState;
  placeBlock: (block: BlockItem, index: number) => void;
  removeBlock: (index: number) => void;
  reset: () => void;
  shuffleItems: () => void;
  onBlockDropped: () => void;
}

export type WorkspaceState = Array<BlockItem | null>;

export interface UseWorkspaceReturn {
  workspace: WorkspaceState;
  placeBlock: (block: BlockItem, index: number) => void;
  removeBlock: (index: number) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  reset: () => void;
}

export interface UseGameActions {
  moveBlock: (
    dragIndex: number,
    hoverIndex: number,
    sourceContainer: ContainerType
  ) => void;
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
  onBlockDropped: () => void;
  resetGame: () => void;
}

interface GameTemp {
  actions?: UseGameActions;
}

export interface UseGameReturn {
  result: GameResult;
  validateGame: (workspace: WorkspaceState) => void;
}
