/**
 * Binary Search Step 2: Second Iteration (mid = 5)
 */

import React from 'react';
import DsaArray from '@/components/DsaArray';
import { useBunnyArrays } from './useBunnyArrays';
import { LoopInvariant } from './LoopInvariant';
import { StepContainer, StepTitle, StepDescription } from './styles';

export const BinarySearchStep2: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 2: mid = 5</StepTitle>
      <StepDescription>
        <code>mid = (left + right) // 2 = (3 + 7) // 2 = 5</code>
        <br />
        Check: <code>bunnies[5].type &lt; HONEY</code> → <strong>False</strong>{' '}
        (Honey bunny)
        <br />
        Update: <code>right = mid = 5</code>
      </StepDescription>
      <LoopInvariant left={3} right={5} mid={5} />
      <DsaArray
        segments={[
          {
            label: 'Before (True)',
            gap: 4,
            items: normalBunnies,
          },
          {
            label: 'After (False)',
            items: honeyBunnies.map((b, i) =>
              i === 1 ? { ...b, highlighted: true } : b
            ),
          },
        ]}
        cellWidth="60px"
        cellHeight="60px"
      />
    </StepContainer>
  );
};

export default BinarySearchStep2;
