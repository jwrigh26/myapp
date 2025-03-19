import type { XYCoord } from 'react-dnd';
import { useDragLayer } from 'react-dnd';
import { usePreview } from 'react-dnd-preview';
import { ContainerType, ItemTypes } from '../constants';
import { BlockItem } from '../types';
import Box from '@mui/material/Box';
import CodeBlock from './CodeBlock';
import { styled } from '@mui/material/styles';

export function TouchPreview() {
  const preview = usePreview();
  if (!preview.display) {
    console.log('No preview to display');
    return null;
  }

  const { item, style, ref } = preview;
  console.log('Touch preview item:', item);

  if (!item || typeof item !== 'object') {
    return null;
  }

  let previewItemData: any;

  // For TouchPreview, the item structure depends on the backend
  // We need to handle both HTML5 and Touch backends
  let previewData: any = null;

  // Try to find the actual data regardless of nesting
  if (item && typeof item === 'object') {
    if ('id' in item && 'type' in item) {
      previewData = item;
    } else if ('item' in item && typeof item.item === 'object') {
      previewData = item.item;
    }
  }

  if (!previewData || !previewData.id) {
    console.log('TouchPreview: Missing required data', item);
    return null;
  }

  return (
    <DragContainer>
      <Box
        style={{
          ...style,
          transform: `${style.transform} scale(0.8)`,
          transformOrigin: 'center center',
        }}
        ref={ref}
      >
        {/* <CodeBlock
          id={block!.id}
          index={0}
          code={block!.code}
          containerType={ContainerType.PREVIEW}
        /> */}
        <Box sx={{ backgroundColor: 'red' }}>
          {previewItemData.id} -- Touch Preview
        </Box>
      </Box>
    </DragContainer>
  );
}

export function DragLayer() {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    }));

  // Early return if not dragging
  if (!isDragging) {
    return null;
  }

  // Early return if no item or wrong type
  if (!item || itemType !== ItemTypes.CODE_BLOCK) {
    console.log('DragLayer: No item or wrong type', { itemType, item });
    return null;
  }

  // FIXED: The condition was inverted - we WANT to show when id is present
  if (!('id' in item)) {
    console.log('DragLayer: Missing id in item', item);
    return null;
  }

  const transform = getItemStyles(initialOffset, currentOffset);

  return (
    <DragContainer>
      <DragPreview transform={transform}>
        {/* <CodeBlock
          id={block.id}
          index={0}
          code={block.code}
          containerType={ContainerType.PREVIEW}
        /> */}
        <Box sx={{ backgroundColor: 'orange' }}>
          {item.id} -- Desktop Preview
        </Box>
      </DragPreview>
    </DragContainer>
  );
}

const getItemStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
): string => {
  if (!initialOffset || !currentOffset) {
    return 'none';
  }

  const { x, y } = currentOffset;
  return `translate(${x}px, ${y}px)`;
};

// ##############################
// # Styled Components
// ##############################

const DragContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: theme.zIndex.modal,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}));

const DragPreview = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'transform',
})<{ transform: string }>(({ theme, transform }) => ({
  transform: `${transform} scale(0.8)`,
  width: '100%',
}));
