/**
 * BinarySearchSteps Component
 *
 * Visualizes the step-by-step process of finding the honey bunny
 * using binary search with the transition point recipe.
 * 
 * This file now re-exports from the modular binarySearch folder.
 */

export {
  BinarySearchSteps,
  BinarySearchStep0,
  BinarySearchStep1,
  BinarySearchStep2,
  BinarySearchStep3,
  BunnyArrayBasic,
  BunnyArraySegmented,
  BinarySearchStepResult,
  LoopInvariant,
  useBunnyArrays,
} from './binarySearch';

export type { LoopInvariantProps } from './binarySearch';

export { default } from './binarySearch';
