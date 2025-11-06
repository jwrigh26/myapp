/**
 * Binary Search Step 0: Initial Setup
 *
 * Shows the initial state with left=-1, right=7, and the first mid calculation.
 */

import React from 'react';
import DsaArray from '@/components/DsaArray';
import VariableValue from '@/components/VariableValue';
import { Spacer } from '@/components/Spacer';
import Stack from '@mui/material/Stack';
import AnchorLink from '@/components/AnchorLink';
import { useBunnyArrays } from './useBunnyArrays';
import { LoopInvariant } from './LoopInvariant';
import {
  StepContainer,
  StepTitle,
  StepSubTitle,
  StepText,
  StepDescription,
  InvariantBox,
  InvariantContainer,
  InvariantText,
  SPACING,
} from './styles';

export const BinarySearchStep0: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle>Step 0: Initial Setup</StepTitle>
      
      <StepSubTitle gutterBottom noMarginBottom>
        Set the Initial Values
      </StepSubTitle>
      <StepText>
        The <code>left</code> and <code>right</code> variables are set to
        predefined sentinels to avoid <strong>out-of-bound</strong> errors.
      </StepText>
      <InvariantBox>
        <Stack direction="row">
          <InvariantContainer showBorderBottom={false}>
            <VariableValue variable="left" color="primary" />
            <InvariantText>=</InvariantText>
            <VariableValue variable="" value={-1} color="default" />
          </InvariantContainer>
          <InvariantContainer showBorderBottom={false}>
            <VariableValue variable="right" color="secondary" />
            <InvariantText>=</InvariantText>
            <VariableValue variable="" value={7} color="default" />
          </InvariantContainer>
        </Stack>
      </InvariantBox>

      <Spacer size={SPACING.node} />
      
      <StepSubTitle gutterBottom noMarginBottom>
        Loop Invariant
      </StepSubTitle>
      <StepText gutterBottom noMarginBottom>
        The loop compares <code>left + 1</code> to <code>right</code>.
      </StepText>
      <StepText>
        Because the condition is <strong>true</strong>, the loop continues.
      </StepText>
      <LoopInvariant left={-1} right={7} mid={3} />
      
      <Spacer size={SPACING.node} />
      
      <StepSubTitle gutterBottom noMarginBottom>
        Test the Predicate
      </StepSubTitle>
      <StepText gutterBottom noMarginBottom>
        We find that <code>mid</code> is <code>3</code>.
      </StepText>
      <StepText gutterBottom noMarginBottom>
        We now ask whether the bunny at index <code>3</code> is{' '}
        <strong>before</strong> a honey bunny using the function{' '}
        <code>is_before</code>.
      </StepText>
      <StepText gutterBottom noMarginBottom>
        The <code>is_before</code> function reveals that the bunny at index{' '}
        <code>3</code> is of type <code>BunnyType.NORMAL</code>.
      </StepText>
      <StepText>
        <span>Because</span> the bunny <strong>is before</strong> a honey bunny, we assign{' '}
        <code>left</code> the value of <code>mid</code>.
      </StepText>

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
      
      <InvariantBox sx={{ borderTop: 'none' }}>
        <InvariantContainer>
          <VariableValue variable="left" color="primary" />
          <InvariantText>=</InvariantText>
          <VariableValue variable="" value="3" color="primary" />
        </InvariantContainer>
      </InvariantBox>
      
      <StepDescription>
        At the end of step 0, <code>left</code> is assigned the value{' '}
        <code>mid = 3</code>.
      </StepDescription>
    </StepContainer>
  );
};

export default BinarySearchStep0;
