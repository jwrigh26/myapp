import { sleep } from '@/utils/utils';
import { useEffect, useRef } from 'react';
import type { DragSourceMonitor, DragSourceOptions, XYCoord } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ContainerType, ItemTypes } from '../constants';
import { useGame } from '../hooks/useGame';
import type { DraggedItem } from '../types';

interface UseDragDropProps {
  id: string;
  index: number;
  containerType: ContainerType;
  code: string;
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
  code,
}: UseDragDropProps) {
  const { setDropCanceled } = useGame();
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag<
    DraggedItem,
    unknown,
    CollectedProps
  >(
    {
      type: ItemTypes.CODE_BLOCK,
      item: { id, index, containerType, code },
      canDrag: true,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor: DragSourceMonitor) => {
        const didDrop = monitor.didDrop();
        const dropResult = monitor.getDropResult();
        const from = monitor.getSourceClientOffset() as XYCoord;
        const to = monitor.getInitialSourceClientOffset() as XYCoord;

        if (
          !didDrop &&
          item.containerType === ContainerType.CAROUSEL &&
          ref?.current
        ) {
          setDropCanceled({ code, from, to });
          // setTimeout(() => {
          //   setDropCanceled(null);
          // }, 420);
          // onSnapBack?.({ from, to, ref }); // Trigger snap-back animation
        }

        if (!dropResult && item.containerType === ContainerType.CAROUSEL) {
          // ON Drag cancelled
          // console.log('!!! End: Snap back', { from, to });
        }

        if (dropResult) {
          // ON Successful drop
          // console.log('End: Dropped', { item, dropResult });
        }
      },
      options: {
        dropEffect: 'move',
        touchStartThreshold: 2,
        moveThreshold: 2,
        enableHoverOutsideTarget: true,
        delayTouchStart: 50,
      } as ExtendedDragSourceOptions,
    },
    [id, index, containerType, code]
  );

  // Setup the drag ref
  const dragRef = (node: HTMLDivElement | null) => {
    ref.current = node;
    drag(node);
  };

  useEffect(() => {
    if (dragPreview) {
      dragPreview(getEmptyImage(), { captureDraggingState: true });
    }
  }, []);

  return {
    drag: dragRef,
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

async function onSnapBack({
  from,
  to,
  ref,
}: {
  from: XYCoord;
  to: XYCoord;
  ref: React.RefObject<HTMLDivElement>;
}) {
  if (!from || !to) {
    console.error('onSnapBack: Missing from/to', { from, to });
    return;
  }

  const element = ref.current;
  if (!element) {
    console.error('onSnapBack: Missing ref.current');
    return;
  }

  element.style.transition = 'none';
  element.style.transform = `translate(${from.x}px, ${from.y}px)`;
  element.style.visibility = 'visible !important';
  // set z-index to 1000 to make sure it's on top
  element.style.zIndex = `1300`;
  // element.offsetHeight; // Trigger reflow
  await sleep(1050);
  console.log('Snap back animation', { from, to });

  // Then animate back to original position
  // element.style.transition = 'transform 3.3s cubic-bezier(0.25, 0.8, 0.25, 1)'; // long animation for testing
  // element.style.transform = 'translate(0, 0)';

  // setTimeout(() => {
  //   if (element) {
  //     // console.log('Snap back animation complete');
  //     element.style.transition = '';
  //     element.style.transform = '';
  //   }
  // }, 300);
}
