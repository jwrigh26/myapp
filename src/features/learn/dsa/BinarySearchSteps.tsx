/**
 * BinarySearchSteps Component
 *
 * Visualizes the step-by-step process of finding the honey bunny
 * using binary search with the transition point recipe.
 */

import DsaArray from '@/components/DsaArray';
import VariableValue from '@/components/VariableValue';
import { mdiRabbit } from '@mdi/js';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Spacer } from '@/components/Spacer';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AnchorLink from '@/components/AnchorLink';

const sectionSpaceSize = 12;
const blockSpaceSize = 8;
const chunkSpaceSize = 4;
const nodeSpaceSize = 2;

const StepContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  marginBottom: theme.spacing(2),
}));

const StepSubTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const StepText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const InvarianBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.grey[50],
  '& > :last-child': {
    borderBottom: 'none',
  },
}));

const InvariantContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showBorderBottom',
})<{ showBorderBottom?: boolean }>(({ theme, showBorderBottom = true }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  padding: theme.spacing(1, 2),
  ...(showBorderBottom && {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
}));

const InvariantText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  fontWeight: 500,
  margin: theme.spacing(0, 0.5),
  color: theme.palette.text.primary,
  // Align with the value text (account for padding)
  paddingBottom: theme.spacing(0.5),
}));

// Loop Invariant Display Component
interface LoopInvariantProps {
  left: number;
  right: number;
  mid?: number;
}

const LoopInvariant: React.FC<LoopInvariantProps> = ({ left, right, mid }) => {
  return (
    <InvarianBox>
      <InvariantContainer>
        <InvariantText>while</InvariantText>
        <VariableValue variable="left" value={left} color="secondary" />
        <InvariantText>+</InvariantText>
        <VariableValue variable="" value={1} color="default" />
        <InvariantText>&lt;</InvariantText>
        <VariableValue variable="right" value={right} color="primary" />
      </InvariantContainer>
      {mid !== undefined && (
        <>
          <InvariantContainer>
            <InvariantText>mid =</InvariantText>
            <InvariantText>(</InvariantText>
            <VariableValue variable="left" value={left} color="secondary" />
            <InvariantText>+</InvariantText>
            <VariableValue variable="right" value={right} color="primary" />
            <InvariantText>)</InvariantText>
            <InvariantText>//</InvariantText>
            <VariableValue variable="" value={2} color="default" />
          </InvariantContainer>
          <InvariantContainer>
            <VariableValue variable="mid" color="info" />
            <InvariantText>=</InvariantText>
            <VariableValue variable="" value={mid} color="default" />
          </InvariantContainer>
        </>
      )}
    </InvarianBox>
  );
};

// Shared bunny arrays hook
const useBunnyArrays = () => {
  const theme = useTheme();

  const normalBunnyColor = theme.palette.primary.main;
  const honeyBunnyColor = theme.palette.secondary.main;

  const normalBunnies = Array(4)
    .fill(null)
    .map(() => ({
      icon: mdiRabbit,
      iconColor: normalBunnyColor,
    }));

  const honeyBunnies = Array(3)
    .fill(null)
    .map(() => ({
      icon: mdiRabbit,
      iconColor: honeyBunnyColor,
    }));

  return { normalBunnies, honeyBunnies };
};

// Step 0: Initial Setup
export const BinarySearchStep0 = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle>Step 0: Initial Setup</StepTitle>
      <StepSubTitle>Set the Initial Values</StepSubTitle>
      <StepText>
        The <code>left</code> and <code>right</code> variables are set to
        predefined sentinels to avoid <strong>out-of-bound</strong> errors.
      </StepText>
      <InvarianBox>
        <Stack direction="row">
          <InvariantContainer showBorderBottom={false}>
            <VariableValue variable="left" color="secondary" />
            <InvariantText>=</InvariantText>
            <VariableValue variable="" value={-1} color="default" />
          </InvariantContainer>
          <InvariantContainer showBorderBottom={false}>
            <VariableValue variable="right" color="primary" />
            <InvariantText>=</InvariantText>
            <VariableValue variable="" value={7} color="default" />
          </InvariantContainer>
        </Stack>
      </InvarianBox>

      <Spacer size={nodeSpaceSize} />
      <StepSubTitle>Loop Invariant</StepSubTitle>
      <StepText>
        The Loop starts out using the <code>left</code> and <code>right</code>{' '}
        values.
      </StepText>
      <LoopInvariant left={-1} right={7} />
      <Spacer size={nodeSpaceSize} />
      <StepSubTitle>The Array</StepSubTitle>
      <StepText>
        This is the same array we defined earlier in the{' '}
        <AnchorLink to="/learn/dsa/binary-search" anchorId="honey-bunny">
          setup section
        </AnchorLink>
        .
      </StepText>
      <BunnyArraySegmented />
      <StepDescription>
        Array of 7 bunnies: 4 normal (indices 0-3) + 3 honey (indices 4-6).
      </StepDescription>
    </StepContainer>
  );
};

// Step 1: First Iteration (mid = 3)
export const BinarySearchStep1 = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 1: mid = 3</StepTitle>
      <StepDescription>
        <code>mid = (left + right) // 2 = (-1 + 7) // 2 = 3</code>
        <br />
        Check: <code>bunnies[3].type &lt; HONEY</code> → <strong>True</strong>{' '}
        (Normal bunny)
        <br />
        Update: <code>left = mid = 3</code>
      </StepDescription>
      <LoopInvariant left={3} right={7} mid={3} />
      <DsaArray
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
    </StepContainer>
  );
};

// Step 2: Second Iteration (mid = 5)
export const BinarySearchStep2 = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Step 2: mid = 5</StepTitle>
      <StepDescription>
        <code>mid = (left + right) // 2 = (3 + 7) // 2 = 5</code>
        <br />
        Check: <code>bunnies[5].type &lt; HONEY</code> → <strong>False</strong>{' '}
        (Honey bunny)
        <br />
        Update: <code>right = mid = 5</code>
      </StepDescription>
      <LoopInvariant left={3} right={5} mid={5} />
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
    </StepContainer>
  );
};

// Step 3: Final Iteration (mid = 4)
export const BinarySearchStep3 = () => {
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

// Step 4: Result
export const BinarySearchStepResult = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle variant="h6">Result</StepTitle>
      <StepDescription>
        <code>left = 3</code> → Last True (last normal bunny at index 3)
        <br />
        <code>right = 4</code> → First False (first honey bunny at index 4)
        <br />
        <strong>The first honey bunny is at index 4! 🍯🐰</strong>
      </StepDescription>
      <DsaArray
        segments={[
          {
            label: 'Before (Normal)',
            gap: 4,
            items: normalBunnies.map((b, i) =>
              i === 3 ? { ...b, highlightedAlt: true } : b
            ),
          },
          {
            label: 'After (Honey)',
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

// Basic Bunny Array (no steps, just the initial array)
export const BunnyArrayBasic = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <DsaArray
      items={[...normalBunnies, ...honeyBunnies]}
      cellWidth="60px"
      cellHeight="60px"
    />
  );
};

// Segmented Bunny Array (with labeled segments for Normal and Honey)
export const BunnyArraySegmented = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <DsaArray
      segments={[
        {
          label: 'Normal Bunnies',
          items: normalBunnies,
        },
        {
          label: 'Honey Bunnies',
          items: honeyBunnies,
        },
      ]}
      cellWidth="60px"
      cellHeight="60px"
    />
  );
};

// Combined component that renders all steps
export const BinarySearchSteps = () => {
  return (
    <Box>
      <BinarySearchStep0 />
      <BinarySearchStep1 />
      <BinarySearchStep2 />
      <BinarySearchStep3 />
      <BinarySearchStepResult />
    </Box>
  );
};

export default BinarySearchSteps;
