import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@/components/Icon';
import React, { ReactNode } from 'react';

// Styled container matching CodeBlock border styling
const ArrayContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'hasBorder' && prop !== 'orientation' && prop !== 'glowBorder',
})<{
  hasBorder?: boolean;
  orientation: 'horizontal' | 'vertical';
  glowBorder?: boolean;
}>(({ theme, hasBorder, orientation, glowBorder }) => {
  // Base styles - always applied
  const baseStyles = {
    position: 'relative' as const,
    width: orientation === 'horizontal' ? '100%' : 'auto',
    maxWidth: orientation === 'horizontal' ? '100%' : 'none',
    display: 'inline-flex' as const,
    flexDirection:
      orientation === 'horizontal' ? ('column' as const) : ('row' as const),
    alignItems: orientation === 'horizontal' ? 'flex-start' : 'center',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
  };

  // No border - return just base styles
  if (!hasBorder) {
    return baseStyles;
  }

  // Border styles - applied when hasBorder is true
  const isDarkMode = theme.palette.mode === 'dark';
  const borderColor = theme.palette.divider;

  const borderStyles = {
    margin: theme.spacing(0, 0),
    padding: theme.spacing(2),
    border: `1px solid ${borderColor}`,
  };

  // Glow styles - only applied when glowBorder is true AND dark mode
  if (glowBorder && isDarkMode) {
    const glowStyles = {
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
    };

    return {
      ...baseStyles,
      ...borderStyles,
      ...glowStyles,
    };
  }

  // Border without glow
  return {
    ...baseStyles,
    ...borderStyles,
  };
});

const ArrayWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'orientation',
})<{ orientation: 'horizontal' | 'vertical' }>(({ orientation }) => ({
  display: 'flex',
  flexDirection: orientation === 'horizontal' ? 'row' : 'column',
  alignItems: 'stretch',
  gap: 0,
}));

const ArraySegment = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'orientation' && prop !== 'customGap',
})<{ orientation: 'horizontal' | 'vertical'; customGap?: number }>(
  ({ theme, orientation, customGap }) => ({
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    alignItems: 'stretch',
    gap: 0,
    position: 'relative', // Add this to contain absolute positioned labels
    '& + &': {
      [orientation === 'horizontal' ? 'marginLeft' : 'marginTop']:
        theme.spacing(customGap ?? 2),
    },
  })
);

const ArrayCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'cellWidth' &&
    prop !== 'cellHeight' &&
    prop !== 'highlighted' &&
    prop !== 'highlightedAlt' &&
    prop !== 'highlightColor' &&
    prop !== 'orientation',
})<{
  cellWidth?: string | number;
  cellHeight?: string | number;
  highlighted?: boolean;
  highlightedAlt?: boolean;
  highlightColor?: string;
  orientation?: 'horizontal' | 'vertical';
}>(
  ({
    theme,
    cellWidth,
    cellHeight,
    highlighted,
    highlightedAlt,
    highlightColor,
    orientation,
  }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: highlighted
      ? `1px solid ${highlightedAlt ? theme.palette.secondary.main : highlightColor || theme.palette.primary.main}`
      : `1px solid ${theme.palette.grey[500]}`,
    backgroundColor: highlighted
      ? highlightedAlt
        ? theme.palette.secondary.main + '11'
        : highlightColor || theme.palette.primary.main + '22'
      : theme.palette.background.paper,
    width: cellWidth || 'auto',
    height: cellHeight || 'auto',
    minWidth: cellWidth || '48px',
    minHeight: cellHeight || '48px',
    transition: 'all 0.3s ease',
    position: 'relative',
    ...(highlighted && {
      boxShadow: `0 0 8px ${highlightedAlt ? theme.palette.secondary.main : highlightColor || theme.palette.primary.main}44`,
      zIndex: 1, // Ensure highlighted cells appear above adjacent cells
    }),
    ...(!highlighted && {
      '&:not(:last-child)': {
        // [orientation === 'vertical' ? 'borderBottom' : 'borderLeft']: 'none !important',
        [orientation === 'vertical' ? 'borderBottom' : 'borderRight']:
          'none !important',
      },
    }),
    // Ensure highlighted cells always show all borders
    ...(highlighted && {
      borderRight: `1px solid ${highlightedAlt ? theme.palette.secondary.main : highlightColor || theme.palette.primary.main} !important`,
      borderBottom: `1px solid ${highlightedAlt ? theme.palette.secondary.main : highlightColor || theme.palette.primary.main} !important`,
      // Remove left/top border from next sibling to prevent double borders
      '& + *': {
        [orientation === 'vertical' ? 'borderTop' : 'borderLeft']:
          'none !important',
      },
    }),
  })
);

const IndexLabel = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'cellWidth' &&
    prop !== 'cellHeight' &&
    prop !== 'orientation' &&
    prop !== 'highlighted' &&
    prop !== 'highlightedAlt',
})<{
  cellWidth?: string | number;
  cellHeight?: string | number;
  orientation?: 'horizontal' | 'vertical';
  highlighted?: boolean;
  highlightedAlt?: boolean;
}>(({ theme, cellWidth, cellHeight, orientation, highlighted, highlightedAlt }) => ({
  fontSize: '0.75rem',
  color: highlighted
    ? highlightedAlt
      ? theme.palette.secondary.main
      : theme.palette.primary.main
    : theme.palette.text.secondary,
  fontWeight: highlighted ? 600 : 400,
  userSelect: 'none',
  padding: theme.spacing(0.5),
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(orientation === 'vertical'
    ? {
        minHeight: cellHeight || '48px',
        height: cellHeight || 'auto',
        minWidth: 'auto',
      }
    : {
        minWidth: cellWidth || '48px',
        width: cellWidth || 'auto',
      }),
}));

const IndicesContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'orientation',
})<{ orientation: 'horizontal' | 'vertical' }>(({ orientation }) => ({
  display: 'flex',
  flexDirection: orientation === 'horizontal' ? 'row' : 'column',
}));

const SegmentLabelContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'orientation' && prop !== 'customGap',
})<{ orientation: 'horizontal' | 'vertical'; customGap?: number }>(
  ({ theme, orientation, customGap }) => ({
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    gap: theme.spacing(customGap ?? 2),
    marginBottom: theme.spacing(0.5),
  })
);

const SegmentLabel = styled(Typography)({
  fontSize: '0.7rem',
  textAlign: 'center',
  display: 'block',
  whiteSpace: 'nowrap',
});

const VerticalArrayContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const SegmentsRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'orientation' && prop !== 'customGap',
})<{ orientation: 'horizontal' | 'vertical'; customGap?: number }>(
  ({ theme, orientation, customGap }) => ({
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    gap: theme.spacing(customGap ?? 2),
  })
);

interface ArrayItemData {
  value?: string | number;
  icon?: string; // MDI path
  iconColor?: string;
  iconSize?: number;
  content?: ReactNode; // Custom content
  highlighted?: boolean;
  highlightedAlt?: boolean; // Alternative highlight using secondary color
  highlightColor?: string;
}

interface ArraySegmentData {
  items: ArrayItemData[];
  label?: string;
  gap?: number; // Gap size in theme.spacing units (e.g., 1 = 8px, 2 = 16px)
}

interface DsaArrayProps {
  // Simple mode: just pass values
  values?: (string | number)[];
  // Advanced mode: pass item data
  items?: ArrayItemData[];
  // Segmented mode: pass segments for split arrays
  segments?: ArraySegmentData[];
  // Display options
  orientation?: 'horizontal' | 'vertical';
  showIndices?: boolean;
  indicesPosition?: 'before' | 'after'; // above/left or below/right
  startIndex?: number;
  // Styling
  border?: boolean;
  cellWidth?: string | number;
  cellHeight?: string | number;
  // Highlighting
  highlightIndices?: number[];
  highlightIndicesAlt?: number[]; // Alternative highlight using secondary color
  highlightColor?: string;
  glowBorder?: boolean; // Use glowing border effect for highlights
}

const DsaArray: React.FC<DsaArrayProps> = React.memo(
  ({
    values,
    items,
    segments,
    orientation = 'horizontal',
    showIndices = true,
    indicesPosition = 'before',
    startIndex = 0,
    border = true,
    cellWidth,
    cellHeight,
    highlightIndices = [],
    highlightIndicesAlt = [],
    highlightColor,
    glowBorder = false,
  }) => {
    // Convert simple values to items format
    const convertToItems = (): ArrayItemData[] => {
      if (segments) {
        return []; // Handled separately
      }
      if (items) {
        return items;
      }
      if (values) {
        return values.map((value) => ({ value }));
      }
      return [];
    };

    const arrayItems = convertToItems();

    const renderCell = (
      item: ArrayItemData,
      index: number,
      globalIndex: number
    ) => {
      const isHighlighted =
        item.highlighted ||
        item.highlightedAlt ||
        highlightIndices.includes(globalIndex);
      const cellHighlightColor =
        item.highlightColor ||
        (item.highlightedAlt ? undefined : highlightColor);

      return (
        <ArrayCell
          key={index}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          highlighted={isHighlighted}
          highlightColor={cellHighlightColor}
          orientation={orientation}
          highlightedAlt={item.highlightedAlt}
        >
          {item.content ? (
            item.content
          ) : item.icon ? (
            <Icon
              path={item.icon}
              sx={{
                color: item.iconColor,
                fontSize: item.iconSize ? `${item.iconSize}rem` : undefined,
              }}
            />
          ) : (
            <Typography variant="body1">{item.value ?? ''}</Typography>
          )}
        </ArrayCell>
      );
    };

    const renderIndices = (count: number, offset: number = 0) => {
      const indices = Array.from({ length: count }, (_, i) => i + offset);
      return (
        <IndicesContainer orientation={orientation}>
          {indices.map((idx) => {
            const isHighlighted = highlightIndices.includes(idx);
            const isHighlightedAlt = highlightIndicesAlt.includes(idx);
            return (
              <IndexLabel
                key={idx}
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                orientation={orientation}
                highlighted={isHighlighted || isHighlightedAlt}
                highlightedAlt={isHighlightedAlt}
              >
                {idx}
              </IndexLabel>
            );
          })}
        </IndicesContainer>
      );
    };

    const renderSegments = () => {
      if (!segments) return null;

      let globalIndex = startIndex;
      // Use the first segment's gap value, or default to 2
      const segmentGap = segments[0]?.gap ?? 2;

      return (
        <Box sx={{ width: '100%' }}>
          {/* Labels */}
          <SegmentLabelContainer
            orientation={orientation}
            customGap={segmentGap}
          >
            {segments.map((segment, segIdx) => (
              <Box
                key={segIdx}
                sx={{
                  minWidth:
                    orientation === 'horizontal'
                      ? `calc(${cellWidth || '48px'} * ${segment.items.length} + ${segment.items.length - 1}px)`
                      : 'auto',
                }}
              >
                {segment.label && (
                  <SegmentLabel variant="caption">{segment.label}</SegmentLabel>
                )}
              </Box>
            ))}
          </SegmentLabelContainer>

          {/* Indices */}
          {showIndices && indicesPosition === 'before' && (
            <SegmentsRow orientation={orientation} customGap={segmentGap}>
              {segments.map((segment, segIdx) => {
                const offset = segments
                  .slice(0, segIdx)
                  .reduce((sum, s) => sum + s.items.length, startIndex);
                return (
                  <Box key={segIdx}>
                    {renderIndices(segment.items.length, offset)}
                  </Box>
                );
              })}
            </SegmentsRow>
          )}

          {/* Array Items */}
          <ArrayWrapper orientation={orientation}>
            {segments.map((segment, segIdx) => {
              const segmentStart = globalIndex;
              const segmentCells = segment.items.map((item, itemIdx) => {
                const cell = renderCell(item, itemIdx, globalIndex);
                globalIndex++;
                return cell;
              });

              return (
                <ArraySegment
                  key={segIdx}
                  orientation={orientation}
                  customGap={segment.gap ?? segmentGap}
                >
                  {segmentCells}
                </ArraySegment>
              );
            })}
          </ArrayWrapper>

          {showIndices && indicesPosition === 'after' && (
            <SegmentsRow orientation={orientation} customGap={segmentGap}>
              {segments.map((segment, segIdx) => {
                const offset = segments
                  .slice(0, segIdx)
                  .reduce((sum, s) => sum + s.items.length, startIndex);
                return (
                  <Box key={segIdx}>
                    {renderIndices(segment.items.length, offset)}
                  </Box>
                );
              })}
            </SegmentsRow>
          )}
        </Box>
      );
    };

    const renderSimpleArray = () => {
      if (orientation === 'vertical') {
        return (
          <VerticalArrayContainer>
            {showIndices &&
              indicesPosition === 'before' &&
              renderIndices(arrayItems.length, startIndex)}

            <ArrayWrapper orientation={orientation}>
              {arrayItems.map((item, index) =>
                renderCell(item, index, startIndex + index)
              )}
            </ArrayWrapper>

            {showIndices &&
              indicesPosition === 'after' &&
              renderIndices(arrayItems.length, startIndex)}
          </VerticalArrayContainer>
        );
      }

      // Horizontal layout
      return (
        <Box sx={{ width: '100%' }}>
          {showIndices &&
            indicesPosition === 'before' &&
            renderIndices(arrayItems.length, startIndex)}

          <ArrayWrapper orientation={orientation}>
            {arrayItems.map((item, index) =>
              renderCell(item, index, startIndex + index)
            )}
          </ArrayWrapper>

          {showIndices &&
            indicesPosition === 'after' &&
            renderIndices(arrayItems.length, startIndex)}
        </Box>
      );
    };

    return (
      <ArrayContainer
        hasBorder={border}
        orientation={orientation}
        glowBorder={glowBorder}
      >
        {segments ? renderSegments() : renderSimpleArray()}
      </ArrayContainer>
    );
  }
);

DsaArray.displayName = 'DsaArray';

export default DsaArray;
