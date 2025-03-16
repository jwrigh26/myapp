import { ContainerType } from './constants';

// ######################
// ### Types
// ######################

export type BlockItemState = BlockItem | null | undefined;

export type CarouselState = Array<BlockItem | null>;

export type DraggedItem = {
  id: string;
  index: number;
  containerType?: ContainerType;
};

export type WorkspaceState = Array<BlockItem | null>;

// ######################
// ### Interfaces
// ######################

export interface BlockItem {
  id: string;
  type: string;
  code: string;
  order?: number;
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

export interface UseWorkspaceReturn {
  items: WorkspaceState;
  getItem: (index: string) => BlockItemState;
  placeBlock: (block: BlockItemState, index: number) => void;
  removeBlock: (index: number) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  reset: () => void;
}

export interface CodeBlockProps {
  id: string; // Matches with block.id
  index: number; // index in the workspace or carousel
  containerType: ContainerType; // let's us know where the block is coming from
  code: string; // code to display
  disabled?: boolean; // disable the block
}

export interface GameProps {
  workspace: UseWorkspaceReturn;
  carousel: UseCarouselReturn;
}

export interface GameResult {
  valid: boolean;
  details?: string;
}
export interface UseGameReturn {
  result: GameResult;
  validateGame: (workspace: WorkspaceState) => void;
}
