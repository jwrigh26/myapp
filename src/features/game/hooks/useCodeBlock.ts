import { useEffect } from 'react';
import type { DragSourceMonitor, DragSourceOptions, ConnectDragPreview } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { ContainerType, ItemTypes } from '../constants';
import type { DraggedItem } from '../types';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface UseDragDropProps {
  id: string;
  index: number;
  containerType: ContainerType;
  code: string;      
  disabled?: boolean;
  preview?: ConnectDragPreview;
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
  code,
  disabled = false,
}: UseDragDropProps) {
  // const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag<
    DraggedItem,
    unknown,
    CollectedProps
  >({
    type: ItemTypes.CODE_BLOCK,
    item: { id, index, containerType, code },
    canDrag: true,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      console.log('end item: ', item, 'dropResult: ', dropResult);
    },
    options: {
      dropEffect: 'move',
      touchStartThreshold: 2,
      moveThreshold: 2,
      enableHoverOutsideTarget: true,
      delayTouchStart: 50,
    } as ExtendedDragSourceOptions,
  }, [id, index, containerType, code]);

  // Setup the drag ref
  // const dragRef = (node: HTMLDivElement | null) => {
  //   ref.current = node;
  //   drag(node);
  // };

  useEffect(() => {
    if (dragPreview) {
      dragPreview(getEmptyImage(), { captureDraggingState: true });
    }
  }, []);

  return {
    drag,
    isDragging,
  };
}

      

// Was used in drop to animate but not sure this is the right way
// move to the drop of workspace or carousel maybe
      // if (dropResult) {
      //   const element = document.getElementById(id);
      //   element?.classList.add('block-drag-end');
      //   setTimeout(() => {
      //     element?.classList.remove('block-drag-end');
      //   }, 300);
      // }