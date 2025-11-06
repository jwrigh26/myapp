/**
 * Binary Search Examples
 *
 * Example components for documentation and testing.
 * These are not used in production.
 */

import React from 'react';
import DsaArray from '@/components/DsaArray';
import { useBunnyArrays } from './useBunnyArrays';
import { StepContainer, StepTitle, StepDescription } from './styles';

/**
 * Basic Bunny Array - no steps, just the initial array
 */
export const BunnyArrayBasic: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <DsaArray
      items={[...normalBunnies, ...honeyBunnies]}
      cellWidth="60px"
      cellHeight="60px"
    />
  );
};

/**
 * Segmented Bunny Array - with labeled segments for Normal and Honey
 */
export const BunnyArraySegmented: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <DsaArray
      segments={[
        {
          label: 'Normal Bunnies',
          items: normalBunnies,
        },
        {
          label: 'Honey Bunnies',
          items: honeyBunnies,
        },
      ]}
      cellWidth="60px"
      cellHeight="60px"
    />
  );
};

/**
 * Binary Search Step Result: Final Answer
 */
export const BinarySearchStepResult: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Result</StepTitle>
      <StepDescription>
        <code>left = 3</code> → Last True (last normal bunny at index 3)
        <br />
        <code>right = 4</code> → First False (first honey bunny at index 4)
        <br />
        <strong>The first honey bunny is at index 4! 🍯🐰</strong>
      </StepDescription>
      <DsaArray
        highlightIndices={[4]}
        highlightIndicesAlt={[3]}
        segments={[
          {
            label: 'Before (Normal)',
            gap: 4,
            items: normalBunnies.map((b, i) =>
              i === 3 ? { ...b, highlightedAlt: true } : b
            ),
          },
          {
            label: 'After (Honey)',
            items: honeyBunnies.map((b, i) =>
              i === 0 ? { ...b, highlighted: true } : b
            ),
          },
        ]}
        cellWidth="60px"
        cellHeight="60px"
      />
    </StepContainer>
  );
};
