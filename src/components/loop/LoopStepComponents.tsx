/**
 * Reusable components for displaying loop iteration steps
 *
 * These components provide a consistent pattern for showing:
 * - Variable states
 * - Loop conditions
 * - Predicate tests
 * - Results
 */

import React from 'react';
import Stack from '@mui/material/Stack';
import VariableValue from '@/components/VariableValue';
import {
  StepBox,
  StepContainer,
  StepMonoText,
  StepGrid,
  StepExpression,
  StepResult,
  StepRow,
  StepHeader,
  StepCaptionWrapper,
  StepCaptionContainer,
  StepCaptionSubtitle,
  StepCaptionText,
  StepSubTitle,
  StepBodyText,
} from './styles';

// ################################################
// ### Variable State Display
// ################################################

interface VariableStateProps {
  variables: Array<{
    name: string;
    value: number | string;
    color?: 'primary' | 'secondary' | 'info' | 'default';
  }>;
  title?: string;
  description?: string | React.ReactNode;
}

export const VariableState: React.FC<VariableStateProps> = ({
  variables,
  title,
  description,
}) => {
  return (
    <>
      {title && (
        <StepSubTitle gutterBottom noMarginBottom>
          {title}
        </StepSubTitle>
      )}
      {description && <StepBodyText>{description}</StepBodyText>}
      <StepBox>
        <Stack direction="row">
          {variables.map((variable, index) => (
            <StepContainer key={index} showBorderBottom={false}>
              <VariableValue variable={variable.name} color={variable.color} />
              <StepMonoText>=</StepMonoText>
              <VariableValue
                variable=""
                value={variable.value}
                color="default"
              />
            </StepContainer>
          ))}
        </Stack>
      </StepBox>
    </>
  );
};

// ################################################
// ### Predicate Test Display
// ################################################

interface PredicateTestProps {
  title?: string;
  description?: string | React.ReactNode;
  expression: React.ReactNode;
  result: React.ReactNode;
  resultColor?: 'primary' | 'secondary' | 'text';
  /** Optional caption shown below the result */
  caption?: string | React.ReactNode;
}

export const PredicateTest: React.FC<PredicateTestProps> = ({
  title,
  description,
  expression,
  result,
  resultColor = 'text',
  caption,
}) => {
  return (
    <>
      {title && (
        <StepSubTitle gutterBottom noMarginBottom>
          {title}
        </StepSubTitle>
      )}
      {description && <StepBodyText>{description}</StepBodyText>}
      <StepGrid>
        <StepHeader align="left" showBorderRight>
          Expression
        </StepHeader>
        <StepHeader align="right">Result</StepHeader>
        <StepRow noBorderBottom={!!caption}>
          <StepExpression>{expression}</StepExpression>
          <StepResult color={resultColor}>{result}</StepResult>
        </StepRow>
        {caption && (
          <StepRow>
            <StepCaptionWrapper showBorderRight>{caption}</StepCaptionWrapper>
            <StepCaptionWrapper><StepCaptionContainer /></StepCaptionWrapper>
          </StepRow>
        )}
      </StepGrid>
    </>
  );
};

// ################################################
// ### Result Assignment Display
// ################################################

interface ResultAssignmentProps {
  variable: string;
  value: number | string;
  color?: 'primary' | 'secondary' | 'info' | 'default';
}

export const ResultAssignment: React.FC<ResultAssignmentProps> = ({
  variable,
  value,
  color = 'primary',
}) => {
  return (
    <StepBox sx={{ borderTop: 'none' }}>
      <StepContainer>
        <VariableValue variable={variable} color={color} />
        <StepMonoText>=</StepMonoText>
        <VariableValue variable="" value={value} color={color} />
      </StepContainer>
    </StepBox>
  );
};

// ################################################
// ### Section with Title
// ################################################

interface SectionProps {
  title?: string;
  subtitle?: string | React.ReactNode;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <>
      {title && (
        <StepSubTitle gutterBottom noMarginBottom>
          {title}
        </StepSubTitle>
      )}
      {subtitle && <StepBodyText>{subtitle}</StepBodyText>}
      {children}
    </>
  );
};

// ################################################
// ### StepCallout Component
// ################################################

interface StepCalloutProps {
  subtitle?: string;
  children: React.ReactNode;
}

export const StepCallout: React.FC<StepCalloutProps> = ({ subtitle, children }) => {
  return (
    <StepCaptionContainer>
      {subtitle && <StepCaptionSubtitle>{subtitle}</StepCaptionSubtitle>}
      <StepCaptionText>{children}</StepCaptionText>
    </StepCaptionContainer>
  );
};
