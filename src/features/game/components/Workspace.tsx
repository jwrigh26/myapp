// Workspace.tsx
import { ItemTypes } from '@/features/game'; // Ensure this matches your defined item type
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useGameActions } from '../hooks/useGame';
import { BlockItem, DraggedItem, WorkspaceState } from '../types';

// We'ere in container Type workspace here
// We should onBlockDropped to be called when a block is dropped
// Make move to workspace if block is null
// Make move block if block is not null

// Carousel should handle moveToCarousel

interface WorkspaceProps {
  items: WorkspaceState;
}

export const Workspace: React.FC<WorkspaceProps> = ({ items }) => {
  const actions = useGameActions();

  return (
    <WorkspaceContainer>
      {items?.map((block, index) => (
        <DropZoneItem
          key={index}
          block={block}
          onBlockDropped={actions?.onBlockDropped}
        />
      ))}
    </WorkspaceContainer>
  );
};

interface DropZoneItemProps {
  block: BlockItem | null;
  onBlockDropped?: (item: DraggedItem) => void;
}

// Only responsible for make the onBlockDropped call
const DropZoneItem: React.FC<DropZoneItemProps> = ({
  block,
  onBlockDropped,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CODE_BLOCK,
    drop: (draggedItem: DraggedItem) => {
      if (!block && canDrop && onBlockDropped) {
        onBlockDropped(draggedItem);

        // Move to workspace
      }

      // if block then moveBlock
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <DropZoneStyled ref={drop} isOver={isOver}>
      {block ? (
        <BlockContent>{block.content}</BlockContent>
      ) : (
        <Placeholder>Drop here</Placeholder>
      )}
    </DropZoneStyled>
  );
};

const WorkspaceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'column',
}));

const DropZoneStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver',
})<{ isOver: boolean }>(({ theme, isOver }) => ({
  height: '48px',
  minHeight: '48px',
  border: `2px dashed ${theme.palette.grey[400]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: isOver ? 'scale(1.02)' : 'scale(1)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
}));

const Placeholder = styled(Box)(({ theme }) => ({
  color: 'grey',
  fontStyle: 'italic',
  ...theme.typography.subtitle2,
}));

const BlockContent = styled(Box)({
  // Customize your block styling here
});
