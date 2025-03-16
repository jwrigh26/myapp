import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import { ContainerType } from '../constants';
import type { CodeBlockProps } from '../types';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  id,
  index,
  code,
  containerType,
  disabled = false,
}) => {
  return (
    <CodeBlockWrapper containerType={containerType} disabled={disabled}>
      {code}
    </CodeBlockWrapper>
  );
};

interface CodeBlockWrapperProps {
  containerType?: ContainerType;
  disabled: boolean;
}

const CodeBlockWrapper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !['isDragging', 'isOver', 'containerType', 'disabled'].includes(
      prop as string
    ),
})<CodeBlockWrapperProps>(({ theme, disabled }) => ({
  position: 'absolute',
  top: -2,
  left: -2,
  bottom: -2,
  right: -2,
  cursor: disabled ? 'default' : 'grab',
  border: `2px solid green`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: disabled
    ? theme.palette.grey[300]
    : theme.palette.background.paper,
}));

export default CodeBlock;
