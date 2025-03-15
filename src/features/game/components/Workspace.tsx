// Workspace.tsx
import { ItemTypes } from '@/features/game'; // Ensure this matches your defined item type
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useWorkspace } from '../hooks/useWorkspace';
import { BlockItem } from '../types';

interface WorkspaceProps {
  dropZoneCount: number;
  onBlockDropped?: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  dropZoneCount,
  onBlockDropped,
}) => {
  const { workspace, placeBlock } = useWorkspace(dropZoneCount);

  return (
    <WorkspaceContainer>
      {workspace.map((block, index) => (
        <DropZoneItem
          key={index}
          index={index}
          block={block}
          placeBlock={placeBlock}
          onBlockDropped={onBlockDropped}
        />
      ))}
    </WorkspaceContainer>
  );
};

interface DropZoneItemProps {
  index: number;
  block: BlockItem | null;
  placeBlock: (block: BlockItem, index: number) => void;
  onBlockDropped?: () => void;
}

const DropZoneItem: React.FC<DropZoneItemProps> = ({
  index,
  block,
  placeBlock,
  onBlockDropped,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CODE_BLOCK,
    drop: (draggedItem: BlockItem) => {
      // Only allow drop if the slot is empty
      if (!block && canDrop) {
        placeBlock(draggedItem, index);
        if (onBlockDropped) {
          onBlockDropped();
        }
      }
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
