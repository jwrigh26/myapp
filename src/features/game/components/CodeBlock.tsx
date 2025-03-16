import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';
import { ContainerType } from '../constants';

interface CodeBlockProps {
  id: string;
  index: number;
  children?: ReactNode | string;
  containerType?: ContainerType;
  disabled?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  id,
  index,
  children,
  containerType,
  disabled = false,
}) => {
  return (
    <CodeBlockWrapper containerType={containerType} disabled={disabled}>
      {children}
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
  width: '100%',
  height: 48,
  minHeight: 48,
  cursor: disabled ? 'default' : 'grab',
  backgroundColor: disabled
    ? theme.palette.grey[300]
    : theme.palette.background.paper,
}));

export default CodeBlock;
