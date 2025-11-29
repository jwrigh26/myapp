/**
 * LoopInvariant Component
 *
 * Displays the loop invariant condition and mid calculation
 * for binary search visualization using a grid layout.
 */

import React from 'react';
import VariableValue from '@/components/VariableValue';
import {
  StepGrid,
  StepRow,
  StepHeader,
  StepExpression,
  StepResult,
  StepMonoText,
  StepCaptionWrapper,
  StepCaptionContainer,
} from '@/components/loop';

export interface LoopInvariantProps {
  left: number;
  right: number;
  mid?: number;
  /** Optional callout shown after the while condition row */
  whileCallout?: React.ReactNode;
  /** Optional callout shown after the mid formula row */
  midFormulaCallout?: React.ReactNode;
  /** Optional callout shown after the mid result row */
  midResultCallout?: React.ReactNode;
}

export const LoopInvariant: React.FC<LoopInvariantProps> = ({
  left,
  right,
  mid,
  whileCallout,
  midFormulaCallout,
  midResultCallout,
}) => {
  // Calculate results
  const whileCondition = left + 1 < right;
  const midCalculation =
    mid !== undefined ? Math.floor((left + right) / 2) : undefined;

  return (
    <StepGrid>
      {/* Header row */}
      <StepHeader align="left" showBorderRight>
        Expression
      </StepHeader>
      <StepHeader align="right">Result</StepHeader>

      {/* While loop condition row */}
      <StepRow noBorderBottom={!!whileCallout}>
        <StepExpression>
          <StepMonoText>while</StepMonoText>
          <VariableValue variable="left" value={left} color="primary" />
          <StepMonoText>+</StepMonoText>
          <VariableValue variable="" value={1} color="default" />
          <StepMonoText>&lt;</StepMonoText>
          <VariableValue variable="right" value={right} color="secondary" />
        </StepExpression>
        <StepResult>
          <StepMonoText>{whileCondition ? 'true' : 'false'}</StepMonoText>
        </StepResult>
      </StepRow>

      {/* While callout (shown after while condition if provided) */}
      {whileCallout && (
        <StepRow>
          <StepCaptionWrapper showBorderRight>
            {whileCallout}
          </StepCaptionWrapper>
          <StepCaptionWrapper>
            <StepCaptionContainer />
          </StepCaptionWrapper>
        </StepRow>
      )}

      {/* Mid calculation rows (only shown if mid is provided) */}
      {mid !== undefined && (
        <>
          {/* Mid formula row */}
          <StepRow noBorderBottom={!!midFormulaCallout}>
            <StepExpression>
              <StepMonoText>mid =</StepMonoText>
              <StepMonoText>(</StepMonoText>
              <VariableValue variable="left" value={left} color="primary" />
              <StepMonoText>+</StepMonoText>
              <VariableValue variable="right" value={right} color="secondary" />
              <StepMonoText>)</StepMonoText>
              <StepMonoText>//</StepMonoText>
              <VariableValue variable="" value={2} color="default" />
            </StepExpression>
            <StepResult>
              <StepMonoText>{left + right} // 2</StepMonoText>
            </StepResult>
          </StepRow>

          {/* Mid formula callout (shown after mid formula if provided) */}
          {midFormulaCallout && (
            <StepRow>
              <StepCaptionWrapper showBorderRight>
                {midFormulaCallout}
              </StepCaptionWrapper>
              <StepCaptionWrapper>
                <StepCaptionContainer />
              </StepCaptionWrapper>
            </StepRow>
          )}

          {/* Mid result row */}
          <StepRow noBorderBottom={!!midResultCallout}>
            <StepExpression>
              <VariableValue variable="mid" color="info" />
              <StepMonoText>=</StepMonoText>
              <VariableValue variable="" value={mid} color="default" />
            </StepExpression>
            <StepResult>
              <StepMonoText>{mid}</StepMonoText>
            </StepResult>
          </StepRow>

          {/* Mid result callout (shown after mid result if provided) */}
          {midResultCallout && (
            <StepRow>
              <StepCaptionWrapper showBorderRight>{midResultCallout}</StepCaptionWrapper>
              <StepCaptionWrapper>
                <StepCaptionContainer />
              </StepCaptionWrapper>
            </StepRow>
          )}
        </>
      )}
    </StepGrid>
  );
};

export default LoopInvariant;
