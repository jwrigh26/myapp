import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ConceptCardGrid, ConceptItem } from '@/components/ConceptCards';
import { mdiFunction } from '@mdi/js';

const predicateConcepts: ConceptItem[] = [
  {
    model: 'Definition',
    description: 'A fancy word for a yes/no test',
    application: [
      'In binary search, it\'s used to split data into two regions.',
      'It acts as a test or condition that divides elements into two groups.'
    ],
    examples: 'is_before(x), is_even(x), is_valid(x)',
    icon: mdiFunction,
  },
];

export default function Predicate() {
  return (
    <Stack spacing={3} sx={{ mb: 1 }}>
      <Typography variant="h5" component="h1">
        What Is a Predicate?
      </Typography>

      <Typography variant="body1">
        A <strong>predicate</strong> is a function that takes an input and returns
        either <code>True</code> or <code>False</code>. 
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic' }}
      >
        In binary search, the predicate <code>is_before(x)</code> determines
        whether an element belongs to the "before" region (<strong>True</strong>)
        or the "after" region (<strong>False</strong>) relative to the target value.
      </Typography>

      <ConceptCardGrid
        items={predicateConcepts}
        descriptionLabel="What It Means"
        applicationLabel="Why It Matters"
        examplesLabel="Common Examples"
      />
    </Stack>
  );
}
