// SidePanelContent.tsx
import { MutableRefObject } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { mdiClose } from '@mdi/js';
import Icon from '@/components/Icon';
import ProseList from '@/components/ProseList';

interface SidePanelContentProps {
  titleRef: MutableRefObject<string>;
  onClose: () => void;
}

const SidePanelSheet = ({ titleRef, onClose }: SidePanelContentProps) => {
  return (
    <Box sx={{ p: 2 }}>
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

