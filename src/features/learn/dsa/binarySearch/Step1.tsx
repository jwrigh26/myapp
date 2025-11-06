/**
 * Binary Search Step 1: First Iteration (mid = 3)
 */

import React from 'react';
import DsaArray from '@/components/DsaArray';
import { useBunnyArrays } from './useBunnyArrays';
import { LoopInvariant } from './LoopInvariant';
import {
  InvariantBox,
  InvariantContainer,
  InvariantText,
  InvariantGrid,
  InvariantExpression,
  InvariantResult,
  InvariantRow,
  InvariantHeader,
  StepContainer,
  StepSubTitle,
  StepText,
  StepTitle,
  StepDescription,
  SPACING,
} from './styles';
import { Spacer } from '@/components/Spacer';
import VariableValue from '@/components/VariableValue';
import Stack from '@mui/material/Stack';
import CodeBlock from '@/components/CodeBlock';

export const BinarySearchStep1: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 1: mid = 3</StepTitle>
      <StepSubTitle gutterBottom noMarginBottom>
        Updated values
      </StepSubTitle>
      <StepText>
        <code>left</code> was updated to <code>3</code>.
      </StepText>
      <InvariantBox>
        <Stack direction="row">
          <InvariantContainer showBorderBottom={false}>
            <VariableValue variable="left" color="primary" />
            <InvariantText>=</InvariantText>
            <VariableValue variable="" value={3} color="default" />
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
      <LoopInvariant left={3} right={7} mid={5} />
      <Spacer size={SPACING.node} />

      <StepSubTitle gutterBottom noMarginBottom>
        Test the Predicate
      </StepSubTitle>
      <StepText>
        Is the bunny at <code>index 5</code> before a{' '}
        <strong>honey bunny</strong>?
      </StepText>
      {/* <CodeBlock
        showCopyButton={false}
        border={false}
        language="python"
        code={`def is_before(x: BunnyType): 
    return x < BunnyType.HONEY`}
      /> */}
      {/* <Spacer size={SPACING.node} /> */}

      <InvariantGrid sx={{ marginBottom: '0', borderBottom: 'none' }}>
        <InvariantHeader>Expression</InvariantHeader>
        <InvariantHeader>Result</InvariantHeader>
        <InvariantRow>
          <InvariantExpression>
            <InvariantText>is_before(</InvariantText>
            <InvariantText>arr[</InvariantText>
            <VariableValue variable="mid" value={5} color="info" />
            <InvariantText>].type</InvariantText>
            <InvariantText>)</InvariantText>
          </InvariantExpression>
          <InvariantResult color="text">
            <InvariantText>false</InvariantText>
          </InvariantResult>
        </InvariantRow>
      </InvariantGrid>
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
      <InvariantBox sx={{ borderTop: 'none' }}>
        <InvariantContainer>
          <VariableValue variable="right" color="secondary" />
          <InvariantText>=</InvariantText>
          <VariableValue variable="" value="5" color="secondary" />
        </InvariantContainer>
      </InvariantBox>
      <StepText>
        The bunny at <code>index 5</code> is a honey bunny!
      </StepText>
      <StepText>
        <code>right</code> is assigned the value <code>mid = 5</code>.
      </StepText>
    </StepContainer>
  );
};

export default BinarySearchStep1;
