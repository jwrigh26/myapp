import TitleBlock from '@/components/TitleBlock';
import {
  BottomCarousel,
  Header,
  ItemTypes,
  useCarousel,
} from '@/features/game';
import { BlockItem } from '@/features/game/types';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/game')({
  component: GameComponent,
});

function GameComponent() {
  const initialItems: BlockItem[] = [
    {
      id: '1',
      type: ItemTypes.CODE_BLOCK,
      content: <ColorBox color="#FFC107">1</ColorBox>,
    },
    {
      id: '2',
      type: ItemTypes.CODE_BLOCK,
      content: <ColorBox color="#FF5722">2</ColorBox>,
    },
  ];

  const { items, shuffleItems, resetItems } =
    useCarousel<BlockItem>(initialItems);

  return (
    <PageLayout>
      <Header title="Binary Search" />
      <BottomCarousel items={items} />
      <TitleBlock subtitle="The Game Page">Game</TitleBlock>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h3" gutterBottom>
          This is the game page.
        </Typography>
        <Typography variant="body1">
          Welcome to the game page! This is where the game will be played.
        </Typography>
      </Box>
    </PageLayout>
  );
}

const ColorBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.primary.superLight,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// TODO: Need a drop zone when wanting to discard a piece but no place in the carousel to return it.
// Reshuffle the carouse button
// No timer for the game
// Add a check or submit button to see if the pieces are in the correct order
// Add a reset button to reset the pieces to their original order
// Add a hint button to show the correct order of the pieces -- maybe
// Add a button to show the correct order of the pieces
