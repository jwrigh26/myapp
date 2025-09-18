import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/')({
  component: LearnHome,
  head: () => ({
    meta: [
      {
        name: 'Learn',
        content: 'My Learning Journey',
      },
      {
        title: 'Learn',
      },
    ],
  }),
});

const LearnHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

function LearnHome() {
  return (
    <>
      <LearnHeader>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
          Learn
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          A collection of topics I'm exploring and mastering. Whether you're
          here to learn alongside me or just curious about these subjects,
          feel free to dive in and expand your knowledge.
        </Typography>
      </LearnHeader>
      <Box sx={{ px: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          What You'll Find Here:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          🧮 <strong>Mathematics</strong> - From fundamental concepts to advanced topics
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          🧠 <strong>Data Structures & Algorithms</strong> - Problem-solving techniques and computational thinking
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          🤖 <strong>AI & Machine Learning</strong> - Exploring the frontiers of artificial intelligence
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a living collection that grows as I learn. Each section contains
          my notes, insights, and practical examples. Use the sidebar to navigate
          between different topics and dive deeper into areas that interest you.
        </Typography>
      </Box>
    </>
  );
}
