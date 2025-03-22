import { isString } from '@/utils/safety';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDragLayer } from 'react-dnd';
import { ContainerType, ItemTypes } from '../constants';
import { useGame } from '../hooks/useGame';
import CodeBlockPreview from './CodeBlockPreview';

export function DragLayer() {
  const { dropCanceled } = useGame();

  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    }));

  // Early return if not dragging
  if (!isDragging && !dropCanceled) {
    return null;
  }

  if (dropCanceled && !isDragging) {
    return <DropCanceled />;
  }

  if (
    !item ||
    itemType !== ItemTypes.CODE_BLOCK ||
    !('id' in item) ||
    !('code' in item)
  ) {
    return null;
  }

  const transform = getItemStyles(initialOffset, currentOffset, isDragging);

  console.log('DragLayer: item', item);
  return (
    <DragContainer>
      <DragPreview transform={transform}>
        <CodeBlockPreview
          id={item!.id}
          index={0}
          code={item!.code}
          containerType={ContainerType.PREVIEW}
        />
      </DragPreview>
    </DragContainer>
  );
}

const getItemStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  isDragging: boolean
): string => {
  if (!isDragging) {
    console.log('getItemStyles: Not dragging');
  }
  if (!initialOffset || !currentOffset) {
    console.log('getItemStyles: No offset');
    return 'none';
  }

  const { x, y } = currentOffset;
  return `translate(${x}px, ${y}px)`;
};

// ##############################
// # DropCanceled
// ##############################

function DropCanceled() {
  const { data, setDropCanceled } = useGame();
  const [animating, setAnimating] = useState(true);
  const theme = useTheme();

  const from = data?.from as XYCoord | null;
  const to = data?.to as XYCoord | null;
  const safeCode = isString(data?.code) ? data.code : '';
  useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => {
        setAnimating(false);
        // setDropCanceled(null);
        // console.log('Drop canceled timeout');
      }, 1);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [animating]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // console.log('TIMEOUT: Drop canceled timeout');
      setDropCanceled(null);
    }, theme.transitions.duration.leavingScreen * 1.5);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!from || !to || !data) {
    return null;
  }
  // `translate(${from.x}px, ${from.y}px)`

  return (
    <DragContainer id="drop-canceled">
      <OuterBlock
        animating={animating}
        tslate={
          animating
            ? `translate(${from.x}px, ${from.y}px) scale(0.88, 0.8)`
            : `translate(${to.x}px, ${to.y}px) scale(1)`
        }
      >
        {/* <InnerBlock scale={animating ? 'scale(0.88, 0.8)' : 'scale(1)'}> */}
        <CodeBlockPreview
          id="snap-back-prevew"
          index={0}
          code={safeCode}
          containerType={ContainerType.PREVIEW}
        />
        {/* </InnerBlock> */}
      </OuterBlock>
    </DragContainer>
  );
}

// ##############################
// # Styled Components
// ##############################

const DragContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: theme.zIndex.modal + 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  // backgroundColor: 'yellow',
}));

interface DragPreviewProps {
  transform?: string;
}

const DragPreview = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'transform',
})<DragPreviewProps>(({ theme, transform }) => ({
  transform: transform ? `${transform} scale(0.88, 0.8)` : 'none',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[5],
  border: `2px solid ${theme.palette.secondary.main}`,
}));

interface SnapBlockProps {
  scale?: string;
  tslate?: string;
  animating?: boolean;
}

const OuterBlock = styled(Box, {
  shouldForwardProp: (prop) =>
    !['translate', 'animating'].includes(prop as string),
})<SnapBlockProps>(({ theme, tslate }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  border: `2px solid ${theme.palette.action.disabled}`,
  width: '100%',
  transform: tslate, // e.g., 'translate(100px, 50px)'
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.leavingScreen,
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  }),
}));

// const InnerBlock = styled(Box, {
//   shouldForwardProp: (prop) => !['scale'].includes(prop as string),
// })<SnapBlockProps>(({ theme, scale }) => ({
//   transform: scale, // e.g., 'scale(1)'
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.leavingScreen * 3,
//     delay: theme.transitions.duration.leavingScreen / 4,
//   }),
//   animationFillMode: 'forwards',
//   easing: theme.transitions.easing.easeOut,
// }));

// ##############################
// ### Notes
// ##############################

// const snapKeyframes = keyframes`
//   0% {
//     transform: translate(0, 0) scale(0.88, 0.8);
//   }
//   100% {
//     transform: translate(100px, 50px) scale(1);
//   }
// `;

// const SnapBackBlock = styled(Box)(({ theme }) => ({
//   position: 'absolute',
//   width: '100%',
//   animation: `${snapKeyframes} ${theme.transitions.duration.leavingScreen}ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
// }));
