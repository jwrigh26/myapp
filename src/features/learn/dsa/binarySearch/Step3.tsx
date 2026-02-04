/**
 * Binary Search Step 3: Final Iteration (mid = 4)
 */
import React from 'react';
import DsaArray from '@/components/DsaArray';
import VariableValue from '@/components/VariableValue';
import { Spacer } from '@/components/Spacer';
import { useBunnyArrays } from './useBunnyArrays';
import { LoopInvariant } from './LoopInvariant';
import {
  VariableState,
  PredicateTest,
  ResultAssignment,
  Section,
  StepCallout,
  StepMonoText,
  SPACING,
} from '@/components/loop';
import { StepContainer, StepTitle, StepBodyText } from './styles';

export const BinarySearchStep3: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 3</StepTitle>

      <VariableState
        title="Updated values"
        description={
          <>
            In the last step, <code>right</code> was updated to <code>4</code>.
          </>
        }
        variables={[
          { name: 'left', value: 3, color: 'primary' },
          { name: 'right', value: 4, color: 'secondary' },
        ]}
      />

      <Spacer size={SPACING.node} />

      <Section
        title="Loop Invariant"
        subtitle={
          <>
            The loop compares <code>left + 1</code> to <code>right</code>.
          </>
        }
      >
        <LoopInvariant
          left={3}
          right={4}
          whileCallout={
            <StepCallout>
              Four is <strong>NOT</strong> less than four. We stop searching.
            </StepCallout>
          }
        />
      </Section>

      <Spacer size={SPACING.node} />

      <DsaArray
        segments={[
          {
            label: 'Before (True)',
            gap: 4,
            items: normalBunnies.map((b, i) =>
              i === 3 ? { ...b, highlighted: true } : b
            ),
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

      <Spacer size={SPACING.chunk} />
      <VariableState
        title="Final values"
        description={
          <>
            <code>left</code> ends at <code>3</code>; <code>right</code> ends at{' '}
            <code>4</code>.
          </>
        }
        variables={[
          { name: 'left', value: 3, color: 'primary' },
          { name: 'right', value: 4, color: 'secondary' },
        ]}
      />
      <StepBodyText>
        We take <code>right</code> from the tuple, so the first honey bunny is
        at index <code>4</code>.
      </StepBodyText>
    </StepContainer>
  );
};

export default BinarySearchStep3;
