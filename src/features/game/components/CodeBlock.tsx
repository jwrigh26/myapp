import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { BlockItem, ContainerType } from '../types';
import { useDragDrop } from '../hooks/useDragDrop';
import { useCodeBlock } from '../hooks/useCodeBlock';


// We are only passing the react node back in useCodeBlock
// and we are not passing a content anymore but expect codblock to take a child

interface CodeBlockProps {
  id: string;
  index: number;
  children?: ReactNode | string;
  containerType: ContainerType;
  moveBlock: (dragIndex: number, hoverIndex: number, sourceContainer: ContainerType) => void;
  moveToWorkspace: (carouselIndex: number, workspaceIndex: number) => void;
  moveToCarousel: (workspaceIndex: number, carouselIndex: number) => void;
  disabled?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  id,
  index,
  children,
  containerType,
  moveBlock,
  moveToWorkspace,
  moveToCarousel,
  disabled = false,
}) => {
  const { ref, isDragging, isOver, canDrop } = useDragDrop({
    id,
    index,
    containerType,
    moveBlock,
    moveToWorkspace,
    moveToCarousel,
    disabled,
  });

  return (
    <CodeBlockWrapper
      ref={ref}
      isDragging={isDragging}
      isOver={isOver && canDrop}
      containerType={containerType}
      disabled={disabled}
    >
      {children}
    </CodeBlockWrapper>
  );
};

interface CodeBlockWrapperProps {
  isDragging: boolean;
  isOver: boolean;
  containerType: ContainerType;
  disabled: boolean;
}

const CodeBlockWrapper = styled(Paper, {
  shouldForwardProp: (prop) => 
    !['isDragging', 'isOver', 'containerType', 'disabled'].includes(prop as string)
})<CodeBlockWrapperProps>(
  ({ theme, isDragging, isOver, containerType, disabled }) => ({
    width: '100%',
    height: 48,
    minHeight: 48,
    opacity: isDragging ? 0.4 : 1,
    cursor: disabled ? 'default' : 'grab',
    backgroundColor: 
      disabled 
        ? theme.palette.grey[300]
        : theme.palette.background.paper,
    border: isOver
      ? `2px dashed ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.divider}`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isDragging
      ? '0px 5px 10px rgba(0,0,0,0.2)'
      : '0px 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
    },
  })
);

export default CodeBlock;