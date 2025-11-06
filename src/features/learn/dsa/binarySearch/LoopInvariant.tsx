/**
 * LoopInvariant Component
 *
 * Displays the loop invariant condition and mid calculation
 * for binary search visualization using a grid layout.
 */

import React from 'react';
import VariableValue from '@/components/VariableValue';
import {
  InvariantGrid,
  InvariantRow,
  InvariantHeader,
  InvariantExpression,
  InvariantResult,
  InvariantText,
} from './styles';

export interface LoopInvariantProps {
  left: number;
  right: number;
  mid?: number;
}

export const LoopInvariant: React.FC<LoopInvariantProps> = ({
  left,
  right,
  mid,
}) => {
  // Calculate results
  const whileCondition = left + 1 < right;
  const midCalculation = mid !== undefined ? Math.floor((left + right) / 2) : undefined;

  return (
    <InvariantGrid>
      {/* Header row */}
      <InvariantHeader>Expression</InvariantHeader>
      <InvariantHeader>Result</InvariantHeader>

      {/* While loop condition row */}
      <InvariantRow>
        <InvariantExpression>
          <InvariantText>while</InvariantText>
          <VariableValue variable="left" value={left} color="primary" />
          <InvariantText>+</InvariantText>
          <VariableValue variable="" value={1} color="default" />
          <InvariantText>&lt;</InvariantText>
          <VariableValue variable="right" value={right} color="secondary" />
        </InvariantExpression>
        <InvariantResult>
          <InvariantText>{whileCondition ? 'true' : 'false'}</InvariantText>
        </InvariantResult>
      </InvariantRow>

      {/* Mid calculation rows (only shown if mid is provided) */}
      {mid !== undefined && (
        <>
          {/* Mid formula row */}
          <InvariantRow>
            <InvariantExpression>
              <InvariantText>mid =</InvariantText>
              <InvariantText>(</InvariantText>
              <VariableValue variable="left" value={left} color="primary" />
              <InvariantText>+</InvariantText>
              <VariableValue variable="right" value={right} color="secondary" />
              <InvariantText>)</InvariantText>
              <InvariantText>//</InvariantText>
              <VariableValue variable="" value={2} color="default" />
            </InvariantExpression>
            <InvariantResult>
              <InvariantText>{left + right} // 2</InvariantText>
            </InvariantResult>
          </InvariantRow>

          {/* Mid result row */}
          <InvariantRow>
            <InvariantExpression>
              <VariableValue variable="mid" color="info" />
              <InvariantText>=</InvariantText>
              <VariableValue variable="" value={mid} color="default" />
            </InvariantExpression>
            <InvariantResult>
              <InvariantText>{mid}</InvariantText>
            </InvariantResult>
          </InvariantRow>
        </>
      )}
    </InvariantGrid>
  );
};

export default LoopInvariant;
