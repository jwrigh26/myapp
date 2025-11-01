/**
 * DsaArray Component - Usage Examples
 * 
 * This file demonstrates the various ways to use the DsaArray component
 * for visualizing data structures in DSA tutorials.
 */

import DsaArray from './DsaArray';
import { mdiRabbitVariant } from '@mdi/js';
import { useTheme } from '@mui/material/styles';

// Example 1: Simple number array
export const SimpleNumberArray = () => (
  <DsaArray values={[1, 2, 4, 6, 8, 9]} />
);

// Example 2: Array with highlighted indices
export const HighlightedArray = () => (
  <DsaArray
    values={[1, 2, 4, 6, 8, 9]}
    highlightIndices={[2, 3]}
    highlightColor="#ff9800"
  />
);

// Example 3: Vertical array
export const VerticalArray = () => (
  <DsaArray
    values={[10, 20, 30, 40, 50]}
    orientation="vertical"
    indicesPosition="before"
  />
);

// Example 4: Array with custom icons (Bunny example)
export const BunnyArray = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const normalBunnyColor = isDarkMode ? '#E8E8E8' : '#757575'; // Light gray in dark mode, darker gray in light mode
  const honeyBunnyColor = isDarkMode ? '#FFD700' : '#F4A300'; // Bright gold in dark mode, darker gold/amber in light mode

  return (
    <DsaArray
      items={[
        { icon: mdiRabbitVariant, iconColor: normalBunnyColor },
        { icon: mdiRabbitVariant, iconColor: normalBunnyColor },
        { icon: mdiRabbitVariant, iconColor: normalBunnyColor },
        { icon: mdiRabbitVariant, iconColor: normalBunnyColor },
        { icon: mdiRabbitVariant, iconColor: honeyBunnyColor, highlighted: true },
        { icon: mdiRabbitVariant, iconColor: honeyBunnyColor },
        { icon: mdiRabbitVariant, iconColor: honeyBunnyColor },
      ]}
      cellWidth="64px"
      cellHeight="64px"
    />
  );
};

// Example 5: Segmented array (showing divide and conquer)
export const SegmentedArray = () => (
  <DsaArray
    segments={[
      {
        label: 'Left Half',
        items: [
          { value: 1 },
          { value: 2 },
          { value: 4 },
        ],
      },
      {
        label: 'Right Half',
        items: [
          { value: 6 },
          { value: 8 },
          { value: 9 },
        ],
      },
    ]}
  />
);

// Example 6: Binary search visualization with pointers
export const BinarySearchVisualization = () => (
  <DsaArray
    items={[
      { value: 1 },
      { value: 2 },
      { value: 4, highlighted: true, highlightColor: '#4caf50' }, // mid
      { value: 6 },
      { value: 8 },
      { value: 9 },
    ]}
    startIndex={0}
    indicesPosition="after"
  />
);

// Example 7: No border, custom cell sizes
export const CustomSizedArray = () => (
  <DsaArray
    values={['A', 'B', 'C', 'D', 'E']}
    border={false}
    cellWidth="80px"
    cellHeight="40px"
    showIndices={false}
  />
);

// Example 8: Complete Binary Search Bunny Walkthrough
export const BunnyBinarySearchWalkthrough = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const normalBunnyColor = isDarkMode ? '#E8E8E8' : '#757575'; // Light gray in dark mode, darker gray in light mode
  const honeyBunnyColor = isDarkMode ? '#FFD700' : '#F4A300'; // Bright gold in dark mode, darker gold/amber in light mode

  return (
    <DsaArray
      segments={[
        {
          label: 'Before (Normal Bunnies)',
          gap: 4, // This sets the gap for all segments
          items: [
            { icon: mdiRabbitVariant, iconColor: normalBunnyColor },
            { icon: mdiRabbitVariant, iconColor: normalBunnyColor },
            { icon: mdiRabbitVariant, iconColor: normalBunnyColor, highlighted: true, highlightColor: '#2196f3' }, // left pointer
            { icon: mdiRabbitVariant, iconColor: normalBunnyColor },
          ],
        },
        {
          label: 'After (Honey Bunnies)',
          // No gap needed here - it inherits from the first segment
          items: [
            { icon: mdiRabbitVariant, iconColor: honeyBunnyColor, highlighted: true, highlightColor: '#f44336' }, // right pointer
            { icon: mdiRabbitVariant, iconColor: honeyBunnyColor },
            { icon: mdiRabbitVariant, iconColor: honeyBunnyColor },
          ],
        },
      ]}
      cellWidth="60px"
      cellHeight="60px"
    />
  );
};
