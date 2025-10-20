import { styled, useTheme } from '@mui/material/styles';
import { useIsMobile, useIsTablet } from '@/context/BreakpointContext';
import Icon from '@/components/Icon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Highlight, themes } from 'prism-react-renderer';
import { mdiContentCopy, mdiCheck } from '@mdi/js';
import React, { useState } from 'react';
// import '@/styles/glowing-border.css';

// Styled component for CodeBlock container with optional glowing border
const CodeBlockContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'codeBorder',
})<{ codeBorder?: boolean }>(({ theme, codeBorder }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  display: 'block',
  '&:hover .copy-button': {
    // opacity: 1,
  },
  ...(codeBorder &&
    theme.palette.mode === 'light' && {
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1, 0),
      border: `1px solid ${theme.palette.divider}`,
    }),
  ...(codeBorder &&
    theme.palette.mode !== 'light' && {
      // Apply the glowing-border class when glow is true
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1, 0),
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `
          0 0 0 1px ${theme.palette.primary.main}22,
          0 2px 8px ${theme.palette.primary.main}44,
          0 3px 12px ${theme.palette.primary.main}11
        `,
      transition:
        'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
      '&:hover, &:focus-within': {
        transform: 'translateY(-1px)',
        boxShadow: `
              0 0 0 1px ${theme.palette.primary.light}22,
              0 3px 12px ${theme.palette.primary.light}44,
              0 4px 16px ${theme.palette.primary.light}11
            `,
        borderColor: theme.palette.primary.main,
      },
    }),
}));

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
  border?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  size = CodeBlockSize.MEDIUM,
  showCopyButton = true,
  collapsible = true,
  maxLinesBeforeCollapse = 15,
  border = false,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const prismTheme = isDarkMode ? themes.vsDark : themes.vsLight;

  // Responsive breakpoints
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // State for collapsible functionality
  const codeLines = code.split('\n');
  const shouldCollapse =
    collapsible && isMobile && codeLines.length > maxLinesBeforeCollapse;
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
        case CodeBlockSize.SMALL:
          return '0.75rem';
        case CodeBlockSize.LARGE:
          return '0.9rem';
        default:
          return '0.8rem';
      }
    }
    if (isTablet) {
      switch (size) {
        case CodeBlockSize.SMALL:
          return '0.8rem';
        case CodeBlockSize.LARGE:
          return '1rem';
        default:
          return '0.9rem';
      }
    }
    // Desktop
    switch (size) {
      case CodeBlockSize.SMALL:
        return theme.typography.body2.fontSize;
      case CodeBlockSize.LARGE:
        return theme.typography.h5.fontSize;
      default:
        return theme.typography.body1.fontSize;
    }
  };

  const getPadding = () => {
    if (isMobile) return theme.spacing(0.5, 0.5);
    if (isTablet) return theme.spacing(0.5, 1);
    return theme.spacing(1, 2);
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
    // Scroll indicators - use individual properties instead of shorthand
    backgroundImage: `
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

  const displayCode =
    shouldCollapse && !isExpanded
      ? codeLines.slice(0, maxLinesBeforeCollapse).join('\n') +
        '\n// ... more code'
      : code;

  const copyButtonStyles = {
    position: 'absolute' as const,
    top: theme.spacing(1),
    right: theme.spacing(1),
    opacity: isMobile ? 1 : 0.5,
    transition: 'opacity 0.2s ease',
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    color: isDarkMode ? '#fff' : '#000',
    minWidth: 'auto',
    padding: theme.spacing(0.5, 1),
    fontSize: '0.75rem',
    '&:hover': {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
      opacity: '1'
    },
  };

  return (
    <CodeBlockContainer
      codeBorder={border}
      className={`code-block-container`}
    >
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
        <Tooltip open={copySuccess} arrow title={'Copied!'}>
          <IconButton
            className="copy-button"
            onClick={handleCopy}
            sx={{
              ...copyButtonStyles,
              minWidth: 'auto',
              width: 32,
              height: 32,
            }}
            size="small"
          >
            <Icon
              path={copySuccess ? mdiCheck : mdiContentCopy}
              fontSize="small"
            />
          </IconButton>
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
              borderColor: isDarkMode
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(0,0,0,0.3)',
              color: isDarkMode ? '#fff' : '#000',
            }}
          >
            {isExpanded ? 'Show Less' : `Show All (${codeLines.length} lines)`}
          </Button>
        </Box>
      )}
    </CodeBlockContainer>
  );
};

export default CodeBlock;
