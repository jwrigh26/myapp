import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ConceptCardGrid, ConceptItem } from '@/components/ConceptCards';
import { mdiShieldCheck, mdiSync, mdiCheckDecagram } from '@mdi/js';

const invariantConcepts: ConceptItem[] = [
  {
    model: 'Definition',
    description: 'Something that remains true no matter how many times the loop runs.',
    application: ["Gives you confidence in the algorithm's behavior.",
        "It's the thing you check in your head at each iteration"],
    examples: 'loop conditions, array bounds, sorted regions.',
    icon: mdiShieldCheck,
  },
];

export default function Invariant() {
  return (
    <Stack spacing={3} sx={{ mb: 1 }}>
      <Typography variant="h5" component="h1">
        What is an Invariant?
      </Typography>

      <Typography variant="body1">
        An <strong>invariant</strong> is something you can rely on being true at
        specific points during execution. A common type of invariant is the{' '}
        <strong>loop invariant</strong>.
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic' }}
      >
        In binary search, the invariant ensures the target (if it exists) stays
        within the range defined by the left and right pointers.
      </Typography>

      <ConceptCardGrid
        items={invariantConcepts}
        descriptionLabel="What It Means"
        applicationLabel="Why It Matters"
        examplesLabel="Common Uses"
      />
    </Stack>
  );
}
