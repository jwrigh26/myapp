import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import { Highlight, themes } from 'prism-react-renderer';
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
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const prismTheme = isDarkMode ? themes.vsDark : themes.vsLight;

  const overrideStyles: React.CSSProperties = {
    overflow: 'auto',
    fontSize: theme.typography.body1.fontSize,
    margin: 0,
    padding: theme.spacing(0, 1),
  };

  return (
    <CodeBlockWrapper containerType={containerType} disabled={disabled}>
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
  border: `2px solid ${theme.palette.background.default}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: disabled
    ? theme.palette.grey[300]
    : theme.palette.background.default,
}));

export default CodeBlock;
