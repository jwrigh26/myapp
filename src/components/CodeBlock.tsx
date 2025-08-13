import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import { Highlight, themes } from 'prism-react-renderer';
import React, { useState } from 'react';

export enum CodeBlockSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface CodeBlockProps {
  code: string;
  language: string;
  size?: CodeBlockSize;
  showCopyButton?: boolean;
  collapsible?: boolean;
  maxLinesBeforeCollapse?: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  size = CodeBlockSize.MEDIUM,
  showCopyButton = true,
  collapsible = true,
  maxLinesBeforeCollapse = 15,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const prismTheme = isDarkMode ? themes.vsDark : themes.vsLight;
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // State for collapsible functionality
  const codeLines = code.split('\n');
  const shouldCollapse = collapsible && isMobile && codeLines.length > maxLinesBeforeCollapse;
  const [isExpanded, setIsExpanded] = useState(!shouldCollapse);
  
  // Copy functionality
  const [copySuccess, setCopySuccess] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getFontSize = () => {
    if (isMobile) {
      switch (size) {
        case CodeBlockSize.SMALL: return '0.75rem';
        case CodeBlockSize.LARGE: return '0.9rem';
        default: return '0.8rem';
      }
    }
    if (isTablet) {
      switch (size) {
        case CodeBlockSize.SMALL: return '0.8rem';
        case CodeBlockSize.LARGE: return '1rem';
        default: return '0.9rem';
      }
    }
    // Desktop
    switch (size) {
      case CodeBlockSize.SMALL: return theme.typography.body2.fontSize;
      case CodeBlockSize.LARGE: return theme.typography.h5.fontSize;
      default: return theme.typography.body1.fontSize;
    }
  };

  const getPadding = () => {
    if (isMobile) return theme.spacing(1, 1);
    if (isTablet) return theme.spacing(1.5, 2);
    return theme.spacing(2, 3);
  };

  const overrideStyles: React.CSSProperties = {
    margin: 0,
    padding: getPadding(),
    borderRadius: theme.shape.borderRadius,
    overflowX: 'auto',
    fontSize: getFontSize(),
    lineHeight: isMobile ? 1.3 : 1.5,
    // Force the pre to respect container width - aggressive approach
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    // Additional containment properties
    display: 'block',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    // Better touch scrolling on mobile
    WebkitOverflowScrolling: 'touch',
    // Scroll indicators
    background: `
      linear-gradient(90deg, ${isDarkMode ? '#1e1e1e' : '#fff'} 30%, transparent),
      linear-gradient(270deg, ${isDarkMode ? '#1e1e1e' : '#fff'} 30%, transparent),
      linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 20%),
      linear-gradient(270deg, rgba(0,0,0,0.3) 0%, transparent 20%)
    `,
    backgroundSize: '40px 100%, 40px 100%, 20px 100%, 20px 100%',
    backgroundPosition: 'left center, right center, left center, right center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'local, local, scroll, scroll',
  };

  const displayCode = shouldCollapse && !isExpanded 
    ? codeLines.slice(0, maxLinesBeforeCollapse).join('\n') + '\n// ... more code'
    : code;

  const containerStyles = {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '100%',
    // Force containment and prevent overflow
    // overflow: 'hidden',
    display: 'block',
    '&:hover .copy-button': {
      opacity: 1,
    },
  };

  const copyButtonStyles = {
    position: 'absolute' as const,
    top: theme.spacing(1),
    right: theme.spacing(1),
    opacity: isMobile ? 1 : 0,
    transition: 'opacity 0.2s ease',
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    color: isDarkMode ? '#fff' : '#000',
    minWidth: 'auto',
    padding: theme.spacing(0.5, 1),
    fontSize: '0.75rem',
    '&:hover': {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
    },
  };

  return (
    <Box sx={containerStyles} className="code-block-container">
      <Highlight theme={prismTheme} code={displayCode} language={language}>
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
      
      {/* Copy Button */}
      {showCopyButton && (
        <Tooltip title={copySuccess ? 'Copied!' : 'Copy code'}>
          <Button
            className="copy-button"
            onClick={handleCopy}
            sx={copyButtonStyles}
            variant="text"
            size="small"
          >
            {copySuccess ? '✓' : '📋'}
          </Button>
        </Tooltip>
      )}
      
      {/* Expand/Collapse Button */}
      {shouldCollapse && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outlined"
            size="small"
            sx={{
              fontSize: '0.75rem',
              padding: theme.spacing(0.5, 1),
              borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              color: isDarkMode ? '#fff' : '#000',
            }}
          >
            {isExpanded ? 'Show Less' : `Show All (${codeLines.length} lines)`}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CodeBlock;
