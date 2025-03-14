import TitleBlock from '@/components/TitleBlock';
import {
  BottomCarousel,
  Header,
  ItemTypes,
  useCarousel,
} from '@/features/game';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, TouchTransition } from 'react-dnd-multi-backend';
import { BlockItem } from '@/features/game/types';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';
import { useCodeBlock } from '@/features/game';
import { HTML } from 'react-dnd-html5-backend/dist/NativeTypes';

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: TouchTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableTouchEvents: true },
      preview: true,
    },
  ],
};

export const Route = createFileRoute('/game')({
  component: GameComponent,
});

function GameComponent() {
  const initialItems: BlockItem[] = [
    {
      id: '1',
      type: ItemTypes.CODE_BLOCK,
      content: <Item color="#FFC107">1</Item>,
    },
    {
      id: '2',
      type: ItemTypes.CODE_BLOCK,
      content: <Item color="#FF5722">2</Item>,
    },
  ];

  const { items, shuffleItems, resetItems } =
    useCarousel<BlockItem>(initialItems);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <PageLayout>
        <BottomCarousel items={items} />
      </PageLayout>
    </DndProvider>
  );
}

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ColorBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.primary.superLight,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
  flex: 1,
}));

function Item({
  children,
  color = '#FFC107',
}: {
  children?: React.ReactNode | number | string;
  color?: string;
}) {
  return (
    <Container>
      <ColorBox color={color}>{children}</ColorBox>
    </Container>
  );
}

// TODO: Need a drop zone when wanting to discard a piece but no place in the carousel to return it.
// Reshuffle the carouse button
// No timer for the game
// Add a check or submit button to see if the pieces are in the correct order
// Add a reset button to reset the pieces to their original order
// Add a hint button to show the correct order of the pieces -- maybe
// Add a button to show the correct order of the pieces
