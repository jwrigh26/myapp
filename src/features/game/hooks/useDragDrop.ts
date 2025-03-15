import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';
import { ItemTypes } from '../constants';
import { BlockItem, ContainerType } from '../types';

interface DragItem {
  id: string;
  index: number;
  containerType: ContainerType;
}

interface UseDragDropProps {
  id: string;
  index: number;
  containerType: ContainerType;
  disabled?: boolean;
}

export function useDragDrop({
  id,
  index,
  containerType,
  disabled = false,
}: UseDragDropProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CODE_BLOCK,
    item: { id, index, containerType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !disabled,
  });

  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: ItemTypes.CODE_BLOCK,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceContainer = item.containerType;
      const targetContainer = containerType;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && sourceContainer === targetContainer) {
        return;
      }

      // Get rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get middle of the item
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Get cursor position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Handle different cases based on source and target containers
      if (sourceContainer === targetContainer) {
        // Moving within the same container
        moveBlock(dragIndex, hoverIndex, sourceContainer);
      } else if (
        sourceContainer === ContainerType.CAROUSEL &&
        targetContainer === ContainerType.WORKSPACE
      ) {
        // Moving from carousel to workspace
        moveToWorkspace(dragIndex, hoverIndex);
      } else if (
        sourceContainer === ContainerType.WORKSPACE &&
        targetContainer === ContainerType.CAROUSEL
      ) {
        // Moving from workspace to carousel
        moveToCarousel(dragIndex, hoverIndex);
      }

      // Update the index for the dragged item
      item.index = hoverIndex;
      item.containerType = targetContainer;
    },
  });

  // Setup the drag and drop refs
  const dragDropRef = (node: HTMLDivElement | null) => {
    ref.current = node;
    drag(drop(node));
  };

  return {
    ref: dragDropRef,
    isDragging,
    isOver,
    canDrop,
  };
}
