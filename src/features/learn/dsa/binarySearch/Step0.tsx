/**
 * Binary Search Step 0: Initial Setup
 *
 * Shows the initial state with left=-1, right=7, and the first mid calculation.
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
import {
  StepContainer,
  StepTitle,
  StepBodyText,
} from './styles';

export const BinarySearchStep0: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle>Step 0: Initial Setup</StepTitle>

      <VariableState
        title="Set the Initial Values"
        description={
          <>
            The <code>left</code> and <code>right</code> variables are set to
            predefined sentinels to avoid <strong>out-of-bound</strong> errors.
          </>
        }
        variables={[
          { name: 'left', value: -1, color: 'primary' },
          { name: 'right', value: 7, color: 'secondary' },
        ]}
      />

      <Spacer size={SPACING.node} />

      <Section 
        title="Loop Invariant"
        subtitle={
          <>
            The loop compares <code>left + 1</code> to <code>right</code>.
            Because the condition is <strong>true</strong>, the loop continues.
          </>
        }
      >
        <LoopInvariant 
          left={-1} 
          right={7} 
          mid={3}
          whileCallout={
            <StepCallout>
              Zero is less than seven. We continue searching.
            </StepCallout>
          }
          midFormulaCallout={
              
            <StepCallout>
              The <code>mid</code> calculation uses <strong>floor division</strong> (//).<br/> Round down to the nearest whole number.
            </StepCallout>
          }
          midResultCallout={
            <StepCallout>
              The calculated <code>mid</code> value of <strong>3</strong> is the index we'll test next.
            </StepCallout>
          }
        />
      </Section>

      <Spacer size={SPACING.node} />

      <PredicateTest
        title="Test the Predicate"
        description={
          <>
            Is the bunny at <code>index 3</code> before a{' '}
            <strong>honey bunny</strong>?
          </>
        }
        expression={
          <>
            <StepMonoText>is_before(</StepMonoText>
            <StepMonoText>arr[</StepMonoText>
            <VariableValue variable="mid" value={3} color="info" />
            <StepMonoText>].type</StepMonoText>
            <StepMonoText>)</StepMonoText>
          </>
        }
        result={<StepMonoText>true</StepMonoText>}
        resultColor="text"
        caption={
          <StepCallout>
            The <code>is_before</code> function checks if the bunny type is
            less than <code>HONEY</code> (i.e., <code>NORMAL</code>).
          </StepCallout>
        }
      />

      <Spacer size={SPACING.chunk} />
      <DsaArray
        highlightIndices={[3]}
        segments={[
          {
            label: 'Before (True)',
            gap: 4,
            items: [
              ...normalBunnies.map((b, i) =>
                i === 3
                  ? {
                      ...b,
                      highlighted: true,
                    }
                  : b
              ),
            ],
          },
          {
            label: 'After (False)',
            items: honeyBunnies,
          },
        ]}
        cellWidth="60px"
        cellHeight="60px"
      />

      <ResultAssignment variable="left" value="3" color="primary" />

      <StepBodyText gutterBottom noMarginBottom>
        The <code>is_before</code> function reveals that the bunny at index{' '}
        <code>3</code> is of type <code>BunnyType.NORMAL</code>.
      </StepBodyText>
      <StepBodyText>
        <span>Because</span> the bunny <strong>is before</strong> a honey bunny,
        we assign <code>left</code> the value of <code>mid</code>.
      </StepBodyText>

      <StepBodyText>
        At the end of step 0, <code>left</code> is assigned the value{' '}
        <code>mid = 3</code>.
      </StepBodyText>
    </StepContainer>
  );
};

export default BinarySearchStep0;
