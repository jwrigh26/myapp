import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ConceptCardGrid, ConceptItem } from '@/components/ConceptCards';
import { mdiShieldAlert, mdiArrowExpandHorizontal, mdiMapMarker } from '@mdi/js';

const sentinelConcepts: ConceptItem[] = [
  {
    model: 'Definition',
    description: 'A special marker value placed at the boundaries of a data structure to simplify edge case handling.',
    application: [
      'Eliminates the need for separate boundary checks in loops.',
      'Prevents off-by-one errors by providing "safe" starting positions.',
      'Makes code cleaner and easier to reason about.',
    ],
    examples: 'left = -1, right = len(arr), null terminators',
    icon: mdiMapMarker,
  },
];

export default function Sentinel() {
  return (
    <Stack spacing={3} sx={{ mb: 1 }}>
      <Typography variant="h5" component="h1">
        What is a Sentinel?
      </Typography>

      <Typography variant="body1">
        A <strong>sentinel</strong> is a special boundary value that acts as a guard
        or placeholder. In algorithms, sentinels are used to avoid checking for
        boundary conditions explicitly.
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic' }}
      >
        In binary search, we use <code>left = -1</code> and <code>right = len(arr)</code>
        as sentinels. These values are outside the array bounds, guaranteeing that
        the invariant holds even before the first iteration.
      </Typography>

      <ConceptCardGrid
        items={sentinelConcepts}
        descriptionLabel="What It Means"
        applicationLabel="Why It Matters"
        examplesLabel="Common Examples"
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        By starting with sentinels, we ensure that <code>left</code> is always
        in the "before" region and <code>right</code> is always in the "after"
        region, making the algorithm more robust and easier to understand.
      </Typography>
    </Stack>
  );
}
