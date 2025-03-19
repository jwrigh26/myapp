import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import { Highlight, themes } from 'prism-react-renderer';
import React, { forwardRef } from 'react';
import { ContainerType } from '../constants';
import { useCodeBlock } from '../hooks/useCodeBlock';
import type { CodeBlockProps } from '../types';
import { CODE_BLOCK_HEIGHT } from './Styles';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  id,
  index,
  code,
  containerType,
  disabled = false,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const prismTheme = isDarkMode ? themes.vsDark : themes.vsLight;

  const overrideStyles: React.CSSProperties = {
    overflow: 'auto',
    fontSize: theme.typography.body1.fontSize,
    margin: 0,
    padding: theme.spacing(0, 1),
  };

  // Ensure code is always a string
  const safeCode = typeof code === 'string' ? code : '';

  const { drag, isDragging } = useCodeBlock({
    id,
    index,
    containerType,
    code: safeCode,
    disabled,
  });

  return (
    <CodeBlockWrapper
      containerType={containerType}
      disabled={false}
      ref={drag}
      isDragging={isDragging}
      style={{ touchAction: 'none' }}
    >
      <Highlight theme={prismTheme} code={code} language="python">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, ...overrideStyles }}>
            {tokens.map((line, index) => {
              return (
                <div key={index + 1} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => {
                    return (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    );
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </CodeBlockWrapper>
  );
};

interface CodeBlockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  containerType?: ContainerType;
  disabled: boolean;
  children?: React.ReactNode;
  isDragging?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

// Create the base styled component
const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !['isDragging', 'isOver', 'containerType', 'disabled'].includes(
      prop as string
    ),
})<Omit<CodeBlockWrapperProps, 'ref'>>(({ theme, disabled, isDragging }) => ({
  position: 'relative',
  width: '100%',
  height: `${CODE_BLOCK_HEIGHT}px`, 
  cursor: disabled ? 'default' : 'grab',
  display: isDragging ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: disabled
    ? theme.palette.grey[300]
    : theme.palette.background.default,
}));

// Create the forwardRef component
const CodeBlockWrapper = forwardRef<
  HTMLDivElement,
  Omit<CodeBlockWrapperProps, 'ref'>
>(({ containerType, disabled, children, ...rest }, ref) => {
  return (
    <StyledPaper
      ref={ref}
      containerType={containerType}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledPaper>
  );
});

CodeBlockWrapper.displayName = 'CodeBlockWrapper';

export default CodeBlock;
