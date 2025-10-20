import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ConceptCardGrid, ConceptItem } from '@/components/ConceptCards';
import { mdiShieldCheck, mdiSync, mdiCheckDecagram } from '@mdi/js';

const invariantConcepts: ConceptItem[] = [
  {
    model: 'Definition',
    description:
      "Something that remains true throughout the execution of an algorithm's main loop",
    application: 'Gives you confidence about the algorithm behavior',
    examples: 'loop conditions, array bounds, sorted regions',
    icon: mdiShieldCheck,
  },
  {
    model: 'In Practice',
    description:
      'Something that stays true no matter how many times the loop runs',
    application: [
      'Verify correctness at each iteration',
      'Debug when invariant is violated',
    ],
    examples: 'binary search pointers, sorted subarrays',
    icon: mdiSync,
  },
  {
    model: 'The Promise',
    description: "A rule that's always maintained",
    application: [
      'Enables mathematical proof of algorithm correctness',
      "It's the thing you check in your head at each itteration",
    ],
    examples: 'divide and conquer, dynamic programming',
    icon: mdiCheckDecagram,
  },
];

export default function Invariant() {
  return (
    <Stack spacing={3} sx={{ mb: 1 }}>
      <Typography variant="h5" component="h1">
        What is an Invariant?
      </Typography>

      <Typography variant="body1">
        An <strong>invariant</strong> is a condition that you can rely on being
        true at specific points during execution.
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic' }}
      >
        In binary search, the invariant is that the target (if it exists) is
        always within the range defined by the left and right pointers.
      </Typography>

      <ConceptCardGrid
        items={invariantConcepts}
        descriptionLabel="What it means"
        applicationLabel="Why it matters"
        examplesLabel="Common uses"
      />
    </Stack>
  );
}
