import { useTemp } from '@/hooks/useContext';
import { useCallback, useRef, useState } from 'react';
import { StorageKeys } from '../constants';
import type {
  BlockItem,
  GameResult,
  UseCarouselReturn,
  UseGameReturn,
  UseWorkspaceReturn,
  WorkspaceState,
} from '../types';

/**
 * useGame
 * @param solution An array of BlockItems in the correct order.
 */
export function useGame(
  solution: BlockItem[],
  carousel: UseCarouselReturn,
  workspace: UseWorkspaceReturn
): UseGameReturn {
  const setActionsRef = useRef(false);
  const [result, setResult] = useState<GameResult>({ valid: false });
  const { temp, setTemp } = useTemp(StorageKeys.GAME);

  /**
   * validateGame checks if the workspace is complete and ordered correctly.
   * It expects the workspace state as ana array of BlockItems or null.
   */
  const validateGame = useCallback(
    (workspace: WorkspaceState) => {
      // Enusre all drop zones are filled.
      if (workspace.some((block) => block === null)) {
        const details = 'Workspace is incomplete. Fill all slots.';
        setResult({ valid: false, details });
        return false;
      }

      // Compare workspace order with the solution.
      const valid = workspace.every(
        (block, index) => block!.order === solution[index].order
      );

      const details = valid
        ? 'Congratulations! You solved it!'
        : 'Incorrect order. Try again.';
      setResult({ valid, details });
      return valid;
    },
    [solution]
  );

  return {
    result,
    validateGame,
  };
}
