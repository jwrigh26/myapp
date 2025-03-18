import { useEffect } from 'react';
import type { DragSourceOptions } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { ContainerType, ItemTypes } from '../constants';
import type { DraggedItem } from '../types';

interface UseDragDropProps {
  id: string;
  index: number;
  containerType: ContainerType;
  disabled?: boolean;
}

// Define the type for the collected props
interface CollectedProps {
  isDragging: boolean;
}

// Extend DragSourceOptions with additional options
interface ExtendedDragSourceOptions extends DragSourceOptions {
  touchStartThreshold?: number;
  moveThreshold?: number;
  enableHoverOutsideTarget?: boolean;
  delayTouchStart?: number;
}

export function useCodeBlock({
  id,
  index,
  containerType,
  disabled = false,
}: UseDragDropProps) {
  // const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag, preview] = useDrag<
    DraggedItem,
    unknown,
    CollectedProps
  >({
    type: ItemTypes.CODE_BLOCK,
    item: { id, index, containerType },
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log('end item: ', item, 'dropResult: ', dropResult);
      // if (dropResult) {
      //   const element = document.getElementById(id);
      //   element?.classList.add('block-drag-end');
      //   setTimeout(() => {
      //     element?.classList.remove('block-drag-end');
      //   }, 300);
      // }
    },
    options: {
      dropEffect: 'move',
      touchStartThreshold: 5,
      moveThreshold: 5,
      enableHoverOutsideTarget: true,
      delayTouchStart: 100,
    } as ExtendedDragSourceOptions,
  });

  // Setup the drag ref
  // const dragRef = (node: HTMLDivElement | null) => {
  //   ref.current = node;
  //   drag(node);
  // };

  useEffect(() => {
    if (preview) {
      // preview(getEmptyImage(), { captureDraggingState: true });
      preview(null);
    }
  }, [preview]);

  return {
    // ref: dragRef,
    drag,
    isDragging,
  };
}
