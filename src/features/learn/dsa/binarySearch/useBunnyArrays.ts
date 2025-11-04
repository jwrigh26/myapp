/**
 * Shared hooks for Binary Search steps
 */

import { useTheme } from '@mui/material/styles';
import { mdiRabbit } from '@mdi/js';

/**
 * Hook that provides bunny arrays for visualization
 * Returns normal bunnies (primary color) and honey bunnies (secondary color)
 */
export const useBunnyArrays = () => {
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
