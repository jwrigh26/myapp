// SidePanelContent.tsx
import { MutableRefObject } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { mdiClose } from '@mdi/js';
import Icon from '@/components/Icon';
import ProseList from '@/components/ProseList';
import CodeBlock from '@/components/CodeBlock';
import DsaArray from '@/components/DsaArray';
import { Spacer } from '@/components/Spacer';
import { useBunnyArrays } from '@/features/learn/dsa/binarySearch/useBunnyArrays';

interface SidePanelContentProps {
  titleRef: MutableRefObject<string>;
  onClose: () => void;
}

const SidePanelSheet = ({ titleRef, onClose }: SidePanelContentProps) => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <Box sx={{p: 2}}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">
          {titleRef.current || 'Binary Search Cheatsheet'}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <Icon path={mdiClose} fontSize="small" />
        </IconButton>
      </Box>

      <CodeBlock
        border
        language="python"
        code={`# Transition Point Binary Search
def transition_point(arr, is_before):
    if not arr:
        return None

    left, right = -1, len(arr)

    while left + 1 < right:
        mid = (left + right) // 2
        if is_before(arr[mid]):
            left = mid
        else:
            right = mid

    return left, right`}
      />

      <Spacer size={4} />

      <Typography variant="subtitle1" gutterBottom>
        Bunny Array (True → False)
      </Typography>
      <DsaArray
        segments={[
          {
            label: 'Before (True)',
            gap: 4,
            items: normalBunnies,
          },
          {
            label: 'After (False)',
            items: honeyBunnies,
          },
        ]}
        cellWidth="54px"
        cellHeight="54px"
      />

      <Spacer size={4} />

      <Typography variant="subtitle1" gutterBottom>
        Quick Rules
      </Typography>
      <ProseList
        items={[
          <>
            Invariant:{' '}
            <code>left</code> is always in the <strong>True</strong> region.
          </>,
          <>
            Invariant:{' '}
            <code>right</code> is always in the <strong>False</strong> region.
          </>,
          <>
            Loop condition: <code>while left + 1 &lt; right</code>
          </>,
          <>
            Output: <code>(left, right)</code> → last True, first False.
          </>,
        ]}
      />
    </Box>
  );
};

export default SidePanelSheet;

