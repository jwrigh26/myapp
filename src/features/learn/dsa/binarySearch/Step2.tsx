/**
 * Binary Search Step 2: Second Iteration (mid = 5)
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

export const BinarySearchStep2: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 2: mid = 5</StepTitle>

      <VariableState
        title="Updated values"
        description={
          <>
            <code>right</code> was updated to <code>5</code>.
          </>
        }
        variables={[
          { name: 'left', value: 3, color: 'primary' },
          { name: 'right', value: 5, color: 'secondary' },
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
      <LoopInvariant left={3} right={5} mid={4} 
          whileCallout={
            <StepCallout>
              Four is less than five. We continue searching.
            </StepCallout>
          }
          midFormulaCallout={
            <StepCallout>
              The <code>mid</code> calculation uses{' '}
              <strong>floor division</strong> (//).
              <br /> Round down to the nearest whole number.
            </StepCallout>
          }
          midResultCallout={
            <StepCallout>
              The calculated <code>mid</code> value of <strong>4</strong> is the
              index we'll test next.
            </StepCallout>
          }
          />
      </Section>
      
      <Spacer size={SPACING.node} />
      <PredicateTest
        description={
          <>
            Is the bunny at <code>index 4</code> a honey bunny?
          </>
        }
        expression={
          <>
            <StepMonoText>is_before(</StepMonoText>
            <StepMonoText>arr[</StepMonoText>
            <VariableValue variable="mid" value={4} color="info" />
            <StepMonoText>].type</StepMonoText>
            <StepMonoText>)</StepMonoText>
          </>
        }
        result={<StepMonoText>false</StepMonoText>}
        resultColor="text"
      />

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
      <ResultAssignment variable="right" value="5" color="secondary" />

      <StepBodyText>
        The bunny at <code>index 4</code> is a honey bunny!
      </StepBodyText>
      <StepBodyText>
        This time <code>right</code> is assigned the value of <code>mid</code>{' '}
        which is <strong>4</strong>.
      </StepBodyText>
    </StepContainer>
  );
};

export default BinarySearchStep2;
