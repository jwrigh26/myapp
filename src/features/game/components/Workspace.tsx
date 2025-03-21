// Workspace.tsx
import { ContainerType, ItemTypes } from '@/features/game'; // Ensure this matches your defined item type
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import type { XYCoord } from 'dnd-core';
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { BlockItemState, DraggedItem, GameProps } from '../types';
import CodeBlock from './CodeBlock';
import { CODE_BLOCK_HEIGHT } from './Styles';

// We'ere in container Type workspace here
// We should onBlockDropped to be called when a block is dropped
// Make move to workspace if block is null
// Make move block if block is not null

// Carousel should handle moveToCarousel

export const Workspace: React.FC<GameProps> = ({ workspace, carousel }) => {
  const { items, placeBlock, reorderBlocks } = workspace;
  const {
    getItem,
    onBlockDropped,
    removeBlock: removeCarouselBlock,
  } = carousel;

  return (
    <WorkspaceContainer>
      {items?.map((block, index) => (
        <DropZoneItem
          block={block}
          getItem={getItem}
          index={index}
          key={index}
          onBlockDropped={onBlockDropped}
          placeBlock={placeBlock}
          removeCarouselBlock={removeCarouselBlock}
          reorderBlocks={reorderBlocks}
        />
      ))}
    </WorkspaceContainer>
  );
};

// ######################
// ### DropZoneItem
// ######################

interface DropZoneItemProps {
  block: BlockItemState;
  index: number;
  getItem: (id: string) => BlockItemState;
  onBlockDropped?: (item: DraggedItem) => void;
  placeBlock: (block: BlockItemState, index: number) => void;
  removeCarouselBlock: (index: number) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
}

// Only responsible for make the onBlockDropped call
const DropZoneItem: React.FC<DropZoneItemProps> = ({
  index,
  block,
  getItem,
  onBlockDropped,
  placeBlock,
  removeCarouselBlock,
  reorderBlocks,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CODE_BLOCK,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover: (item: DraggedItem, monitor) => {
      if (!canDrop || !block || !ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddlyY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddlyY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddlyY) {
        return;
      }

      reorderBlocks(dragIndex, hoverIndex);
    },
    drop: (item: DraggedItem) => {
      if (!canDrop) {
        return;
      }
      if (item?.containerType === ContainerType.CAROUSEL && onBlockDropped) {
        // Make carousle scroll to next block
        // Move to workspace
        // Remove block from carousel
        onBlockDropped(item);
        // placeBlock(getItem(item.id), index);
        // removeCarouselBlock(item.index);
      }

      return;
    },
  });

  // TODO: Implement Dragging

  // drop(ref);

  return (
    <DropZoneStyled ref={drop} isOver={isOver && canDrop}>
      {block ? (
        <CodeBlock
          id={block.id}
          index={index}
          containerType={ContainerType.WORKSPACE}
          code={block.code}
        />
      ) : (
        <Placeholder>Drop here</Placeholder>
      )}
    </DropZoneStyled>
  );
};

// ######################
// ### Styled Components
// ######################

const WorkspaceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'column',
}));

const DropZoneStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver',
})<{ isOver: boolean }>(({ theme, isOver }) => ({
  height: `${CODE_BLOCK_HEIGHT}px`,
  minHeight: `${CODE_BLOCK_HEIGHT}px`,
  border: `2px dashed ${theme.palette.grey[400]}`,
  opacity: isOver ? 1 : 0.7,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: isOver ? 'scale(1.01, 1.2)' : 'scale(1)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
  width: '100%',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
}));

const Placeholder = styled(Box)(({ theme }) => ({
  color: 'grey',
  fontStyle: 'italic',
  ...theme.typography.subtitle2,
  userSelect: 'none',
  pointerEvents: 'none',
}));
