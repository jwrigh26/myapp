/**
 * Binary Search Step 1: First Iteration (mid = 3)
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

export const BinarySearchStep1: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 1: mid = 3</StepTitle>

      <VariableState
        title="Updated values"
        description={
          <>
            <code>left</code> was updated to <code>3</code>.
          </>
        }
        variables={[
          { name: 'left', value: 3, color: 'primary' },
          { name: 'right', value: 7, color: 'secondary' },
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
          right={7}
          mid={5}
          whileCallout={
            <StepCallout>
              Four is less than seven. We continue searching.
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
              The calculated <code>mid</code> value of <strong>5</strong> is the
              index we'll test next.
            </StepCallout>
          }
        />
      </Section>

      <Spacer size={SPACING.node} />

      <PredicateTest
        title="Test the Predicate"
        description={
          <>
            Is the bunny at <code>index 5</code> before a{' '}
            <strong>honey bunny</strong>?
          </>
        }
        expression={
          <>
            <StepMonoText>is_before(</StepMonoText>
            <StepMonoText>arr[</StepMonoText>
            <VariableValue variable="mid" value={5} color="info" />
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
              i === 1 ? { ...b, highlighted: true } : b
            ),
          },
        ]}
        cellWidth="60px"
        cellHeight="60px"
      />

      <ResultAssignment variable="right" value="5" color="secondary" />

      <StepBodyText>
        The bunny at <code>index 5</code> is a honey bunny!
      </StepBodyText>
      <StepBodyText>
        This time <code>right</code> is assigned the value of <code>mid</code>{' '}
        which is <strong>5</strong>.
      </StepBodyText>
    </StepContainer>
  );
};

export default BinarySearchStep1;
