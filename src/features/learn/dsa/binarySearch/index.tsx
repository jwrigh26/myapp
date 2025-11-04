/**
 * Binary Search Steps - Main Export
 *
 * Combines all steps into a single component and provides
 * individual step exports for flexibility.
 */

import React from 'react';
import Box from '@mui/material/Box';

// Step components
export { BinarySearchStep0 } from './Step0';
export { BinarySearchStep1 } from './Step1';
export { BinarySearchStep2 } from './Step2';
export { BinarySearchStep3 } from './Step3';

// Example components (not used in production)
export {
  BunnyArrayBasic,
  BunnyArraySegmented,
  BinarySearchStepResult,
} from './examples';

// Shared components
export { LoopInvariant } from './LoopInvariant';
export type { LoopInvariantProps } from './LoopInvariant';

// Hooks
export { useBunnyArrays } from './useBunnyArrays';

// Styles
export * from './styles';

// Import for the combined component
import { BinarySearchStep0 } from './Step0';
import { BinarySearchStep1 } from './Step1';
import { BinarySearchStep2 } from './Step2';
import { BinarySearchStep3 } from './Step3';

/**
 * Combined component that renders all steps in sequence
 */
export const BinarySearchSteps: React.FC = () => {
  return (
    <Box>
      <BinarySearchStep0 />
      <BinarySearchStep1 />
      <BinarySearchStep2 />
      <BinarySearchStep3 />
    </Box>
  );
};

export default BinarySearchSteps;
