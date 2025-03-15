import {
  BottomCarousel,
  ItemTypes,
  useCarousel,
  useGame,
  useWorkspace,
  Workspace,
} from '@/features/game';
import { BlockItem } from '@/features/game/types';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { createFileRoute } from '@tanstack/react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MultiBackend, TouchTransition } from 'react-dnd-multi-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

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
      order: 0,
    },
    {
      id: '2',
      type: ItemTypes.CODE_BLOCK,
      content: <Item color="#FF5722">2</Item>,
      order: 1,
    },
  ];

  const solution = [...initialItems]; // For now assume the solution is the same as the initial items
  const dropZoneCount = initialItems.length;

  const carousel = useCarousel(initialItems);
  const workspace = useWorkspace(dropZoneCount);
  const game = useGame(solution, carousel, workspace);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <PageLayout>
        <Workspace items={workspace?.items} />
        <BottomCarousel items={carousel.items} />
      </PageLayout>
    </DndProvider>
  );
}

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));

const ColorBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.primary.superLight,
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
  return <ColorBox color={color}>{children}</ColorBox>;
}
