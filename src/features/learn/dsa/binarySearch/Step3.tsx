/**
 * Binary Search Step 3: Final Iteration (mid = 4)
 */

import React from 'react';
import DsaArray from '@/components/DsaArray';
import { useBunnyArrays } from './useBunnyArrays';
import { LoopInvariant } from './LoopInvariant';
import { StepContainer, StepTitle, StepDescription } from './styles';

export const BinarySearchStep3: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 3: mid = 4</StepTitle>
      <StepDescription>
        <code>mid = (left + right) // 2 = (3 + 5) // 2 = 4</code>
        <br />
        Check: <code>bunnies[4].type &lt; HONEY</code> → <strong>False</strong>{' '}
        (Honey bunny)
        <br />
        Update: <code>right = mid = 4</code>
        <br />
        Loop ends: <code>left + 1 == right</code> (3 + 1 == 4)
      </StepDescription>
      <LoopInvariant left={3} right={4} mid={4} />
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

export default BinarySearchStep3;
