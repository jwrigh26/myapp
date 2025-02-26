import { useTheme } from '@mui/material/styles';
import { Highlight, themes } from 'prism-react-renderer';
import React from 'react';

export enum CodeBlockSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface CodeBlockProps {
  code: string;
  language: string;
  size?: CodeBlockSize;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  size = CodeBlockSize.MEDIUM,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const prismTheme = isDarkMode ? themes.vsDark : themes.vsLight;

  const getFontSize = () => {
    switch (size) {
      case CodeBlockSize.SMALL:
        return theme.typography.body2.fontSize;
      case CodeBlockSize.LARGE:
        return theme.typography.h5.fontSize;
      default:
        return theme.typography.body1.fontSize;
    }
  };

  const overrideStyles: React.CSSProperties = {
    margin: 0,
    padding: theme.spacing(0, 2),
    borderRadius: theme.shape.borderRadius,
    overflowX: 'auto', // Optional: Prevent horizontal overflow
    fontSize: getFontSize(),
  };

  return (
    <Highlight theme={prismTheme} code={code} language={language}>
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
  );
};

export default CodeBlock;
